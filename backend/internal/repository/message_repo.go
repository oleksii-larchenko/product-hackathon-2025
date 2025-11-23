package repository

import (
	"context"

	"backend/internal/model"

	"github.com/uptrace/bun"
)

type MessageRepository interface {
	AddMessage(ctx context.Context, user *model.Message) error
	GetAllMessagesByID(ctx context.Context, userId int) ([]model.Message, error)
}

type messageRepository struct {
	db *bun.DB
}

func NewMessageRepository(db *bun.DB) MessageRepository {
	return &messageRepository{db: db}
}

func (r *messageRepository) AddMessage(ctx context.Context, user *model.Message) error {
	_, err := r.db.NewInsert().Model(user).Exec(ctx)
	return err
}

func (r *messageRepository) GetAllMessagesByID(ctx context.Context, userId int) ([]model.Message, error) {
	var messages []model.Message
	err := r.db.NewSelect().
		Model(&messages).
		Where("user_id = ?", userId).
		Order("order_number ASC").
		Scan(ctx)
	return messages, err
}

func (r *messageRepository) GetThreadIDByUserID(ctx context.Context, userId int) (string, error) {
	var message model.Message
	err := r.db.NewSelect().
		Model(&message).
		Where("user_id = ?", userId).
		Order("order_number ASC").
		Limit(1).
		Scan(ctx)

	if err != nil {
		return "", err
	}

	return message.ThreadID, nil
}
