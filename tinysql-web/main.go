package main

import (
	"os"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func main() {
	// set port
	os.Setenv("PORT", "3001")

	// setup db
	db := OpenDB()

	// init server
	m := martini.Classic()
	m.Use(InjectDB(db))
	m.Use(render.Renderer())
	m.Use(InjectJSONWriter())


	// router
	m.Group("/tinysql", func(r martini.Router) {
		r.Get("/connections", GetConnections)
		r.Post("/create", CreateConnect)
	})

	m.Run()
}
