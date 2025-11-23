package repository

import (
	"context"

	"backend/internal/model"

	"github.com/uptrace/bun"
)

type UserRepository interface {
	Create(ctx context.Context, user *model.User) error
	FindByEmailAndPassword(ctx context.Context, email, password string) (bool, error)
}

type userRepository struct {
	db *bun.DB
}

func NewUserRepository(db *bun.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(ctx context.Context, user *model.User) error {
	_, err := r.db.NewInsert().Model(user).Exec(ctx)
	return err
}

func (r *userRepository) FindByEmailAndPassword(ctx context.Context, email, password string) (bool, error) {
	var user model.User

	err := r.db.NewSelect().
		Model(&user).
		Where("email = ?", email).
		Where("password = ?", password).
		Scan(ctx)

	if err != nil {
		return false, err
	}

	return true, nil
}
