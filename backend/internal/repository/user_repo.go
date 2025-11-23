package repository

import (
	"context"

	"backend/internal/model"

	"github.com/uptrace/bun"
)

type UserRepository interface {
	Create(ctx context.Context, user *model.User) error
	FindByEmailAndPassword(ctx context.Context, email, password string) (int, error)
	UpdateQuizAnswersByID(ctx context.Context, userID int, quizAnswers string) error
	GetByID(ctx context.Context, userID int) (*model.User, error)
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

func (r *userRepository) FindByEmailAndPassword(ctx context.Context, email, password string) (int, error) {
	var user model.User

	err := r.db.NewSelect().
		Model(&user).
		Where("email = ?", email).
		Where("password = ?", password).
		Scan(ctx)

	if err != nil {
		return 0, err
	}

	return user.ID, nil
}

func (r *userRepository) UpdateQuizAnswersByID(ctx context.Context, userID int, quizAnswers string) error {
	_, err := r.db.NewUpdate().
		Model(&model.User{}).
		Set("quiz_answers = ?", quizAnswers).
		Where("id = ?", userID).
		Exec(ctx)
	return err
}

func (r *userRepository) GetByID(ctx context.Context, userID int) (*model.User, error) {
	var user model.User
	err := r.db.NewSelect().
		Model(&user).
		Where("id = ?", userID).
		Scan(ctx)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
