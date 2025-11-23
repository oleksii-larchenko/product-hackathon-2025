package server

import (
	"backend/internal/handler"

	"github.com/fasthttp/router"
)

func registerRoutes(
	r *router.Router,
	auth *handler.AuthHandler,
) {
	r.POST("/auth/register", auth.Register)
	r.POST("/auth/login", auth.Login)
}
