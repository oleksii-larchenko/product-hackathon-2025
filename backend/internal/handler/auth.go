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
	var req struct {
		Fullname string `json:"fullname"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.Unmarshal(ctx.PostBody(), &req); err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		return
	}

	err := h.srv.RegisterUser(context.Background(), service.RegisterParams{
		Fullname: req.Fullname,
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		ctx.SetStatusCode(http.StatusInternalServerError)
		return
	}

	ctx.SetStatusCode(http.StatusOK)
}

func (h *AuthHandler) Login(ctx *fasthttp.RequestCtx) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.Unmarshal(ctx.PostBody(), &req); err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		return
	}

	isAuthorized, err := h.srv.AuthorizeUser(context.Background(), service.AuthParams{
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		ctx.SetStatusCode(http.StatusInternalServerError)
		return
	}

	if !isAuthorized {
		ctx.SetStatusCode(http.StatusUnauthorized)
		return
	}

	ctx.SetStatusCode(http.StatusOK)
}
