package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"backend/pkg/openai"
	"context"
	"fmt"
	"math/rand"
)

type ChatService struct {
	messageRepo repository.MessageRepository
	client      *openai.Client
	assistantID string
}

func NewChatService(mr repository.MessageRepository, c *openai.Client) *ChatService {
	return &ChatService{messageRepo: mr, client: c, assistantID: "asst_57MzTRjbYqQxiFiwcGkFBtLh"}
}

func (s *ChatService) AddMessage(ctx context.Context, userID int, content string) (model.Message, error) {
	// Get current messages to determine order numbers
	messages, err := s.messageRepo.GetAllMessagesByID(ctx, userID)
	if err != nil {
		return model.Message{}, err
	}

	nextOrderNumber := len(messages) + 1

	messageId := rand.Int()

	// Add user message to repository
	userMessage := &model.Message{
		ID:          messageId,
		UserID:      userID,
		Content:     content,
		Role:        "user",
		OrderNumber: nextOrderNumber,
	}

	err = s.messageRepo.AddMessage(ctx, userMessage)
	if err != nil {
		return model.Message{}, err
	}

	// Create thread and get AI response
	thread, err := s.client.CreateThread()
	if err != nil {
		return model.Message{}, err
	}

	// Add user message to OpenAI thread
	err = s.client.AddMessage(thread.ID, openai.MessageRequest{
		Role:    "user",
		Content: content,
	})
	if err != nil {
		return model.Message{}, err
	}

	run, err := s.client.CreateRun(thread.ID, s.assistantID)
	if err != nil {
		return model.Message{}, err
	}

	// Poll for completion
	for {
		currentRun, err := s.client.GetRun(thread.ID, run.ID)
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
		default:
			// Continue polling
		}
	}

	// Get AI response
	aiMessages, err := s.client.GetMessages(thread.ID)
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

	botMessageID := rand.Int()

	// Add AI message to repository
	botMessage := &model.Message{
		ID:          botMessageID,
		UserID:      userID,
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
