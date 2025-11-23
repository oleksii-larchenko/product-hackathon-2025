package handler

import (
	"backend/internal/repository"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"backend/internal/service"

	"github.com/valyala/fasthttp"
)

type ChatHandler struct {
	srv  *service.ChatService
	repo repository.MessageRepository
}

func NewChat(s *service.ChatService, repo repository.MessageRepository) *ChatHandler {
	return &ChatHandler{srv: s, repo: repo}
}

func (h *ChatHandler) AddMessage(ctx *fasthttp.RequestCtx) {
	ctx.SetContentType("application/json; charset=utf-8")

	userIDStr := ctx.UserValue("user_id")
	userID, err := strconv.Atoi(fmt.Sprintf("%v", userIDStr))
	if err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		return
	}

	var req struct {
		Message string `json:"message"`
	}
	if err := json.Unmarshal(ctx.PostBody(), &req); err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	if userID == 0 || req.Message == "" {
		ctx.SetStatusCode(http.StatusBadRequest)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "UserID and message are required"})
		return
	}

	botMessage, err := h.srv.AddMessage(context.Background(), userID, req.Message)
	if err != nil {
		ctx.SetStatusCode(http.StatusInternalServerError)
		json.NewEncoder(ctx).Encode(map[string]string{"error": err.Error()})
		return
	}

	var result = map[string]interface{}{
		"role":    botMessage.Role,
		"content": botMessage.Content,
	}

	ctx.SetStatusCode(http.StatusOK)
	json.NewEncoder(ctx).Encode(result)
}

func (h *ChatHandler) GetAllMessages(ctx *fasthttp.RequestCtx) {
	ctx.SetContentType("application/json; charset=utf-8")

	userIDStr := ctx.UserValue("user_id")
	userID, err := strconv.Atoi(fmt.Sprintf("%v", userIDStr))
	if err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		return
	}

	if userID == 0 {
		ctx.SetStatusCode(http.StatusBadRequest)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "UserID is required"})
		return
	}

	messages, err := h.repo.GetAllMessagesByID(context.Background(), userID)
	if err != nil {
		ctx.SetStatusCode(http.StatusInternalServerError)
		json.NewEncoder(ctx).Encode(map[string]string{"error": err.Error()})
		return
	}

	result := make(map[int]map[string]interface{})
	for _, msg := range messages {
		result[msg.OrderNumber] = map[string]interface{}{
			"role":    msg.Role,
			"content": msg.Content,
		}
	}

	ctx.SetStatusCode(http.StatusOK)
	json.NewEncoder(ctx).Encode(result)
}
