package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"context"
	"math/rand"
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
	userId := rand.Int()

	user := &model.User{
		ID:       userId,
		Email:    params.Email,
		Password: params.Password,
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		return 0, err
	}

	return userId, nil
}

type AuthParams struct {
	Email    string
	Password string
}

func (s *AuthService) AuthorizeUser(ctx context.Context, params AuthParams) (int, error) {
	return s.userRepo.FindByEmailAndPassword(ctx, params.Email, params.Password)
}
