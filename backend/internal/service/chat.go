package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"backend/pkg/openai"
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"time"
)

type ChatService struct {
	messageRepo repository.MessageRepository
	userRepo    repository.UserRepository
	client      *openai.Client
	assistantID string
}

func NewChatService(mr repository.MessageRepository, ur repository.UserRepository, c *openai.Client) *ChatService {
	return &ChatService{messageRepo: mr, userRepo: ur, client: c, assistantID: "asst_57MzTRjbYqQxiFiwcGkFBtLh"}
}

type QuizAnswers struct {
	BusinessSector      string `json:"business_sector"`
	BusinessDescription string `json:"business_description"`
}

func (s *ChatService) AddMessage(ctx context.Context, userID int, content string) (model.Message, error) {
	// Get current messages
	messages, err := s.messageRepo.GetAllMessagesByID(ctx, userID)
	if err != nil {
		return model.Message{}, err
	}

	nextOrderNumber := len(messages) + 1
	var threadID string
	isNewThread := len(messages) == 0

	// Check if user already has a thread
	if len(messages) > 0 {
		threadID = messages[0].ThreadID // All messages should have same thread_id
	} else {
		// Create new thread for first message
		thread, err := s.client.CreateThread()
		if err != nil {
			return model.Message{}, err
		}
		threadID = thread.ID
	}

	// If new thread, inject business context first
	if isNewThread {
		err = s.injectBusinessContext(ctx, userID, threadID)
		if err != nil {
			return model.Message{}, err
		}
	}

	// Add user message to repository
	userMessage := &model.Message{
		ID:          rand.Int(),
		UserID:      userID,
		ThreadID:    threadID,
		Content:     content,
		Role:        "user",
		OrderNumber: nextOrderNumber,
	}

	err = s.messageRepo.AddMessage(ctx, userMessage)
	if err != nil {
		return model.Message{}, err
	}

	// Add ONLY the current message to the existing thread
	err = s.client.AddMessage(threadID, openai.MessageRequest{
		Role:    "user",
		Content: content,
	})
	if err != nil {
		return model.Message{}, err
	}

	// Rest remains the same...
	run, err := s.client.CreateRun(threadID, s.assistantID)
	if err != nil {
		return model.Message{}, err
	}

	// Poll for completion
	for {
		currentRun, err := s.client.GetRun(threadID, run.ID)
		if err != nil {
			return model.Message{}, err
		}

		if currentRun.Status == "completed" {
			break
		}

		if currentRun.Status == "failed" {
			return model.Message{}, fmt.Errorf("OpenAI run failed")
		}

		select {
		case <-ctx.Done():
			return model.Message{}, ctx.Err()
		case <-time.After(1 * time.Second):
		}
	}

	// Get AI response
	aiMessages, err := s.client.GetMessages(threadID)
	if err != nil {
		return model.Message{}, err
	}

	var aiResponse string
	for _, msg := range aiMessages.Data {
		if msg.Role == "assistant" && len(msg.Content) > 0 {
			aiResponse = msg.Content[0].Text.Value
			break
		}
	}

	if aiResponse == "" {
		return model.Message{}, fmt.Errorf("no response from assistant")
	}

	// Add AI message to repository
	botMessage := &model.Message{
		ID:          rand.Int(),
		UserID:      userID,
		ThreadID:    threadID,
		Content:     aiResponse,
		Role:        "assistant",
		OrderNumber: nextOrderNumber + 1,
	}

	err = s.messageRepo.AddMessage(ctx, botMessage)
	if err != nil {
		return model.Message{}, err
	}

	return *botMessage, nil
}

func (s *ChatService) injectBusinessContext(ctx context.Context, userID int, threadID string) error {
	// Get user's quiz answers
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return err
	}

	if user.QuizAnswers == "" {
		return nil
	}

	var quizAnswers QuizAnswers
	err = json.Unmarshal([]byte(user.QuizAnswers), &quizAnswers)
	if err != nil {
		return fmt.Errorf("failed to parse quiz answers: %w", err)
	}

	contextMessage := fmt.Sprintf("User's business context: Sector: %s, Description: %s. Please use this information to provide relevant advice.",
		quizAnswers.BusinessSector, quizAnswers.BusinessDescription)

	err = s.client.AddMessage(threadID, openai.MessageRequest{
		Role:    "user",
		Content: contextMessage,
	})

	return err
}
