package main

import "gorm.io/gorm"

type Connection struct {
	gorm.Model

	Type   string
	Config string
}
