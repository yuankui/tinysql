package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Connection struct {
	gorm.Model

	Title  string `json:"title"`
	Type   string `json:"type"`
	Config string `json:"config"`
}

type DBGetter struct {
	db *gorm.DB
}

func (m *DBGetter) GetDb() *gorm.DB {
	return m.db
}

func OpenDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	db.AutoMigrate(&Connection{})
	if err != nil {
		panic("fail to connect db test.db")
	}

	return db
}
