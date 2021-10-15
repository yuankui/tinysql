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
	m.Use(render.Renderer())

	m.Map(&DBGetter{db: db})
	m.Map(&SupporterFactory{})
	m.Use(InjectTinyContext())

	// router
	m.Group("/tinysql", func(r martini.Router) {
		r.Get("/connections", GetConnections)
		r.Post("/create", CreateConnect)
		r.Post("/deleteConnection/:id", DeleteConnect)
		r.Get("/connection/:id", GetConnection)
		r.Get("/database", GetDatabase)
		r.Get("/table", GetTable)
	})

	m.Run()
}
