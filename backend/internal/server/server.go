package server

import (
	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"

	"backend/internal/db"
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
)

type Server struct {
	router *router.Router
}

func New() *Server {
	r := router.New()

	bunDB, err := db.Connect("postgres://your_username:your_password@postgres:5432/your_db_name?sslmode=disable")
	if err != nil {
		panic(err)
	}

	// Repositories
	userRepo := repository.NewUserRepository(bunDB)

	// Services
	authService := service.NewAuthService(userRepo)

	// Handlers
	authHandler := handler.NewAuth(authService)

	// Routes
	registerRoutes(r, authHandler)

	return &Server{router: r}
}

func (s *Server) Listen(addr string) error {
	return fasthttp.ListenAndServe(addr, s.router.Handler)
}
