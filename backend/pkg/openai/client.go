package openai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type Client struct {
	apiKey     string
	baseURL    string
	httpClient *http.Client
}

type AssistantRequest struct {
	Name         string `json:"name"`
	Instructions string `json:"instructions"`
	Model        string `json:"model"`
}

type AssistantResponse struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Instructions string `json:"instructions"`
	Model        string `json:"model"`
}

type ThreadRequest struct{}

type ThreadResponse struct {
	ID string `json:"id"`
}

type MessageRequest struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type RunRequest struct {
	AssistantID string `json:"assistant_id"`
}

type RunResponse struct {
	ID     string `json:"id"`
	Status string `json:"status"`
}

type MessagesResponse struct {
	Data []struct {
		ID      string `json:"id"`
		Role    string `json:"role"`
		Content []struct {
			Type string `json:"type"`
			Text struct {
				Value string `json:"value"`
			} `json:"text"`
		} `json:"content"`
	} `json:"data"`
}

func NewClient(apiKey string) *Client {
	return &Client{
		apiKey:  apiKey,
		baseURL: "https://api.openai.com/v1",
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func (c *Client) CreateAssistant(req AssistantRequest) (*AssistantResponse, error) {
	var resp AssistantResponse
	err := c.makeRequest("POST", "/assistants", req, &resp)
	return &resp, err
}

func (c *Client) CreateThread() (*ThreadResponse, error) {
	var resp ThreadResponse
	err := c.makeRequest("POST", "/threads", ThreadRequest{}, &resp)
	return &resp, err
}

func (c *Client) AddMessage(threadID string, message MessageRequest) error {
	return c.makeRequest("POST", fmt.Sprintf("/threads/%s/messages", threadID), message, nil)
}

func (c *Client) CreateRun(threadID string, assistantID string) (*RunResponse, error) {
	var resp RunResponse
	req := RunRequest{AssistantID: assistantID}
	err := c.makeRequest("POST", fmt.Sprintf("/threads/%s/runs", threadID), req, &resp)
	return &resp, err
}

func (c *Client) GetRun(threadID, runID string) (*RunResponse, error) {
	var resp RunResponse
	err := c.makeRequest("GET", fmt.Sprintf("/threads/%s/runs/%s", threadID, runID), nil, &resp)
	return &resp, err
}

func (c *Client) GetMessages(threadID string) (*MessagesResponse, error) {
	var resp MessagesResponse
	err := c.makeRequest("GET", fmt.Sprintf("/threads/%s/messages", threadID), nil, &resp)
	return &resp, err
}

func (c *Client) makeRequest(method, endpoint string, body interface{}, result interface{}) error {
	var reqBody io.Reader
	if body != nil {
		jsonBody, err := json.Marshal(body)
		if err != nil {
			return err
		}
		reqBody = bytes.NewBuffer(jsonBody)
	}

	req, err := http.NewRequest(method, c.baseURL+endpoint, reqBody)
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("OpenAI-Beta", "assistants=v2")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return fmt.Errorf("API error: %s", resp.Status)
	}

	if result != nil {
		return json.NewDecoder(resp.Body).Decode(result)
	}

	return nil
}
