package server

import (
	"backend/internal/handler"

	"github.com/fasthttp/router"
)

func registerRoutes(
	r *router.Router,
	auth *handler.AuthHandler,
	summary *handler.SummaryHandler,
	chat *handler.ChatHandler,
) {
	r.POST("/auth/register", auth.Register)
	r.POST("/auth/login", auth.Login)

	r.POST("/summary/{user_id}", summary.CreateSummary)

	r.POST("/chat/{user_id}", chat.AddMessage)
	r.GET("/chat/{user_id}", chat.GetAllMessages)
}
