package main

import "github.com/go-martini/martini"
import "github.com/martini-contrib/render"

func main() {
	m := martini.Classic()
	m.Use(render.Renderer())
	m.Get("/", func() string {
		return "Hello world!"
	})
	m.Run()
}
