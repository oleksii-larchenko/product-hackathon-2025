package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"backend/internal/service"

	"github.com/valyala/fasthttp"
)

type SummaryHandler struct {
	srv *service.SummaryService
}

func NewSummary(s *service.SummaryService) *SummaryHandler {
	return &SummaryHandler{s}
}

func (h *SummaryHandler) CreateSummary(ctx *fasthttp.RequestCtx) {
	result, err := h.srv.CreateSummaryWithOpenAI(ctx, string(ctx.PostBody()))
	if err != nil {
		fmt.Println(err)
		ctx.SetStatusCode(http.StatusInternalServerError)
		return
	}

	response, _ := json.Marshal(result)
	ctx.SetStatusCode(http.StatusOK)
	ctx.SetBody(response)
}
