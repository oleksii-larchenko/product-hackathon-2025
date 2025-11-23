package server

import (
	"backend/pkg/openai"
	"os"

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

	openaiAPIKey := os.Getenv("OPENAI_API_KEY")
	if openaiAPIKey == "" {
		panic("OPENAI_API_KEY environment variable not set")
	}
	client := openai.NewClient(openaiAPIKey)

	userRepo := repository.NewUserRepository(bunDB)

	authService := service.NewAuthService(userRepo)
	summaryService := service.NewSummaryService(client)

	authHandler := handler.NewAuth(authService)
	summaryHandler := handler.NewSummary(summaryService)

	registerRoutes(r, authHandler, summaryHandler)

	return &Server{router: r}
}

func (s *Server) Listen(addr string) error {
	return fasthttp.ListenAndServe(addr, s.router.Handler)
}
