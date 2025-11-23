package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"context"
	"fmt"
	"math/rand"
	"time"
)

type AuthService struct {
	userRepo repository.UserRepository
}

func NewAuthService(userRepo repository.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

type RegisterParams struct {
	Email    string
	Password string
}

func (s *AuthService) RegisterUser(ctx context.Context, params RegisterParams) (int, error) {
	rand.Seed(time.Now().UnixNano())
	userId := rand.Intn(2147483647) + 1

	user := &model.User{
		ID:       userId,
		Email:    params.Email,
		Password: params.Password,
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		fmt.Printf("[AuthService] Failed to create user with ID %d, email %s: %v\n", userId, params.Email, err)
		return 0, err
	}

	fmt.Printf("[AuthService] Successfully created user with ID %d, email %s\n", userId, params.Email)
	return userId, nil
}

type AuthParams struct {
	Email    string
	Password string
}

func (s *AuthService) AuthorizeUser(ctx context.Context, params AuthParams) (int, error) {
	return s.userRepo.FindByEmailAndPassword(ctx, params.Email, params.Password)
}
