package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"context"
)

type AuthService struct {
	userRepo repository.UserRepository
}

func NewAuthService(userRepo repository.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

type RegisterParams struct {
	Fullname string
	Email    string
	Password string
}

func (s *AuthService) RegisterUser(ctx context.Context, params RegisterParams) error {
	user := &model.User{
		Fullname: params.Fullname,
		Email:    params.Email,
		Password: params.Password,
	}

	return s.userRepo.Create(ctx, user)
}

type AuthParams struct {
	Email    string
	Password string
}

func (s *AuthService) AuthorizeUser(ctx context.Context, params AuthParams) (bool, error) {
	return s.userRepo.FindByEmailAndPassword(ctx, params.Email, params.Password)
}
