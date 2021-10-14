package main

import (
	"net/http"

	"github.com/go-martini/martini"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Connection struct {
	gorm.Model

	Title  string `json:"title"`
	Type   string `json:"type"`
	Config string `json:"config"`
}

type dBGetter struct {
	db *gorm.DB
}

type DBGetter interface {
	GetDb() *gorm.DB
}

func (m *dBGetter) GetDb() *gorm.DB {
	return m.db
}

func InjectDB(db *gorm.DB) martini.Handler {
	return func(res http.ResponseWriter, req *http.Request, c martini.Context) {
		c.MapTo(&dBGetter{db: db}, (*DBGetter)(nil))
	}
}

func OpenDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	db.AutoMigrate()
	if err != nil {
		panic("fail to connect db test.db")
	}

	return db
}
