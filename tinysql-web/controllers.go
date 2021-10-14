package main

import (
	"github.com/go-martini/martini"
)

func CreateConnect(db DBGette, params martini.Params, json JSONWrite) {
	tp := params["type"]
	config := params["config"]

	connection := Connection{
		Type:   tp,
		Config: config,
	}

	db.GetDb().Create(&connection)
	json.OK("OK")
}

func GetConnections(db DBGette, json JSONWrite) {
	var connections = []Connection{}
	db.GetDb().Find(&connections)

	json.OK(connections)
}
