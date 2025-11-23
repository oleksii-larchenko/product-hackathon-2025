package handler

import (
	"backend/internal/repository"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"backend/internal/service"

	"github.com/valyala/fasthttp"
)

type SummaryHandler struct {
	srv      *service.SummaryService
	userRepo repository.UserRepository
}

func NewSummary(s *service.SummaryService, ur repository.UserRepository) *SummaryHandler {
	return &SummaryHandler{srv: s, userRepo: ur}
}

func (h *SummaryHandler) CreateSummary(ctx *fasthttp.RequestCtx) {
	userIDStr := ctx.UserValue("user_id")
	userID, err := strconv.Atoi(fmt.Sprintf("%v", userIDStr))
	if err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		return
	}

	answers := string(ctx.PostBody())

	err = h.userRepo.UpdateQuizAnswersByID(ctx, userID, answers)
	if err != nil {
		fmt.Println(err)
		ctx.SetStatusCode(http.StatusInternalServerError)
		return
	}

	result, err := h.srv.CreateSummaryWithOpenAI(ctx, answers)
	if err != nil {
		fmt.Println(err)
		ctx.SetStatusCode(http.StatusInternalServerError)
		return
	}

	response, _ := json.Marshal(result)
	ctx.SetStatusCode(http.StatusOK)
	ctx.SetBody(response)
}
