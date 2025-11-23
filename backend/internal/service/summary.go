package service

import (
	"backend/pkg/openai"
	"context"
	"errors"
)

type SummaryService struct {
	openaiClient *openai.Client
	assistantID  string
}

func NewSummaryService(client *openai.Client) *SummaryService {
	return &SummaryService{
		openaiClient: client,
		assistantID:  "asst_cZRcGXtJQtQ4205MbzgsWYJS",
	}
}

func (s *SummaryService) CreateSummaryWithOpenAI(ctx context.Context, jsonData string) (string, error) {
	if jsonData == "" {
		return "", errors.New("input data is empty")
	}

	// Create a new thread for this conversation
	thread, err := s.openaiClient.CreateThread()
	if err != nil {
		return "", err
	}

	// Add user message with the JSON data
	err = s.openaiClient.AddMessage(thread.ID, openai.MessageRequest{
		Role:    "user",
		Content: jsonData,
	})
	if err != nil {
		return "", err
	}

	// Create and start the run
	run, err := s.openaiClient.CreateRun(thread.ID, s.assistantID)
	if err != nil {
		return "", err
	}

	// Poll for completion
	for {
		currentRun, err := s.openaiClient.GetRun(thread.ID, run.ID)
		if err != nil {
			return "", err
		}

		if currentRun.Status == "completed" {
			break
		}

		if currentRun.Status == "failed" {
			return "", errors.New("OpenAI run failed")
		}

		// Wait before next poll
		select {
		case <-ctx.Done():
			return "", ctx.Err()
		default:
			// Continue polling
		}
	}

	// Get the assistant's response
	messages, err := s.openaiClient.GetMessages(thread.ID)
	if err != nil {
		return "", err
	}

	// Find the latest assistant message
	for _, msg := range messages.Data {
		if msg.Role == "assistant" && len(msg.Content) > 0 {
			return msg.Content[0].Text.Value, nil
		}
	}

	return "", errors.New("no response from assistant")
}
