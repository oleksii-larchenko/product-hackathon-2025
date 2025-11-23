package main

import (
	"log"

	"backend/internal/server"
)

func main() {
	srv := server.New()

	log.Println("Listening on :8080")
	if err := srv.Listen(":8080"); err != nil {
		log.Fatal(err)
	}
}
