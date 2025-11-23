package model

import "github.com/uptrace/bun"

type User struct {
	bun.BaseModel `bun:"table:hackathon.users"`

	ID          int64  `bun:",pk,autoincrement"`
	Email       string `bun:",unique,notnull"`
	Fullname    string `bun:",notnull"`
	Password    string `bun:",notnull"`
	QuizAnswers string `bun:",type:jsonb"`
}
