package main

import "github.com/go-martini/martini"

func CreateConnection(params martini.Params) string {
	t := params["type"]
	config := params["config"]
	return t + config;
}
