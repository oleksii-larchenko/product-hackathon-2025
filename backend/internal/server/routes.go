package server

import (
	"backend/internal/handler"

	"github.com/fasthttp/router"
)

func registerRoutes(
	r *router.Router,
	auth *handler.AuthHandler,
	summary *handler.SummaryHandler,
) {
	r.POST("/auth/register", auth.Register)
	r.POST("/auth/login", auth.Login)

	r.POST("/summary/{user_id}", summary.CreateSummary)
}
