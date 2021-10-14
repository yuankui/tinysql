package main

import (
	"os"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

type Person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	// set port
	os.Setenv("PORT", "3001")

	// setup db
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("fail to connect db test.db")
	}

	db.AutoMigrate(Connection{})

	db.Create(&Connection{
		Type:   "mysql",
		Config: "mysql://localhost:3306/test?",
	})

	var connections []Connection

	db.Find(&connections)

	// init server
	m := martini.Classic()
	m.Use(render.Renderer())
	m.Group("/tinysql", func(r martini.Router) {
		r.Get("/connections", func(re render.Render) {
			re.JSON(200, []string{"hello connections"})
		})
	})
	m.Run()
}
