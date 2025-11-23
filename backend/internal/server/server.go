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
	messageRepo := repository.NewMessageRepository(bunDB)

	authService := service.NewAuthService(userRepo)
	summaryService := service.NewSummaryService(client)
	chatService := service.NewChatService(messageRepo, userRepo, client)

	authHandler := handler.NewAuth(authService)
	summaryHandler := handler.NewSummary(summaryService, userRepo)
	chatHandler := handler.NewChat(chatService, messageRepo)

	registerRoutes(r, authHandler, summaryHandler, chatHandler)

	return &Server{router: r}
}

func (s *Server) Listen(addr string) error {
	handler := corsMiddleware(s.router.Handler)
	return fasthttp.ListenAndServe(addr, handler)
}
