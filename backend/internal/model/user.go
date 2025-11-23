package model

import "github.com/uptrace/bun"

type User struct {
	bun.BaseModel `bun:"table:hackathon.users"`

	ID          int    `bun:",pk"`
	Email       string `bun:",unique,notnull"`
	Password    string `bun:",notnull"`
	QuizAnswers string `bun:",type:jsonb"`
}
