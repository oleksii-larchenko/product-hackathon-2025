package handler

import (
	"context"
	"encoding/json"
	"net/http"

	"backend/internal/service"

	"github.com/valyala/fasthttp"
)

type AuthHandler struct {
	srv *service.AuthService
}

func NewAuth(s *service.AuthService) *AuthHandler {
	return &AuthHandler{s}
}

func (h *AuthHandler) Register(ctx *fasthttp.RequestCtx) {
	ctx.SetContentType("application/json; charset=utf-8")

	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.Unmarshal(ctx.PostBody(), &req); err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	if req.Email == "" || req.Password == "" {
		ctx.SetStatusCode(http.StatusBadRequest)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "Email and password are required"})
		return
	}

	userId, err := h.srv.RegisterUser(context.Background(), service.RegisterParams{
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		ctx.SetStatusCode(http.StatusInternalServerError)
		json.NewEncoder(ctx).Encode(map[string]string{"error": err.Error()})
		return
	}

	ctx.SetStatusCode(http.StatusOK)
	json.NewEncoder(ctx).Encode(map[string]interface{}{"message": "User registered successfully", "user_id": userId})
}

func (h *AuthHandler) Login(ctx *fasthttp.RequestCtx) {
	ctx.SetContentType("application/json; charset=utf-8")

	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.Unmarshal(ctx.PostBody(), &req); err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	if req.Email == "" || req.Password == "" {
		ctx.SetStatusCode(http.StatusBadRequest)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "Email and password are required"})
		return
	}

	userId, err := h.srv.AuthorizeUser(context.Background(), service.AuthParams{
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		ctx.SetStatusCode(http.StatusInternalServerError)
		json.NewEncoder(ctx).Encode(map[string]string{"error": err.Error()})
		return
	}

	if userId == 0 {
		ctx.SetStatusCode(http.StatusUnauthorized)
		json.NewEncoder(ctx).Encode(map[string]string{"error": "Invalid email or password"})
		return
	}

	ctx.SetStatusCode(http.StatusOK)
	json.NewEncoder(ctx).Encode(map[string]interface{}{"message": "Login successful", "user_id": userId})
}
