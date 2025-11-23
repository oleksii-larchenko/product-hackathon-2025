package model

import (
	"github.com/uptrace/bun"
)

type Message struct {
	bun.BaseModel `bun:"table:hackathon.messages"`

	ID          int    `bun:",pk"`
	UserID      int    `bun:"user_id,notnull"`
	ThreadID    string `bun:"thread_id,notnull"`
	Content     string `bun:",notnull"`
	Role        string `bun:",notnull"`
	OrderNumber int    `bun:",notnull"`
}
