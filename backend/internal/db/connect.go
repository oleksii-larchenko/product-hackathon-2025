package db

import (
	"backend/internal/model"
	"context"
	"database/sql"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

func Connect(dsn string) (*bun.DB, error) {
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	db := bun.NewDB(sqldb, pgdialect.New())

	if err := db.Ping(); err != nil {
		return nil, err
	}

	ctx := context.Background()

	_, err := db.Exec("CREATE SCHEMA IF NOT EXISTS hackathon")
	if err != nil {
		return nil, err
	}

	_, err = db.NewCreateTable().Model((*model.User)(nil)).IfNotExists().Exec(ctx)
	if err != nil {
		return nil, err
	}

	return db, nil
}
