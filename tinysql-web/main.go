package main

import (
	"os"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

type Person struct {
	Name string `json: "name"`
	Age  int    `json:"age"`
}

func main() {
	// set port
	os.Setenv("PORT", "3001")

	// init server
	m := martini.Classic()
	m.Use(render.Renderer())
	m.Get("/", func(r render.Render) {
		r.JSON(200, Person{
			Name: "yuankui",
			Age:  11,
		})
	})
	m.Run()
}
