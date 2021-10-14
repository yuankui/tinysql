package main

import (
	"github.com/go-martini/martini"
)

func CreateConnect(db DBGetter, params martini.Params, json JSONWriter) {
	tp := params["type"]
	config := params["config"]
	title := params["title"]

	connection := Connection{
		Type:   tp,
		Config: config,
		Title:  title,
	}

	db.GetDb().Create(&connection)
	json.OK("OK")
}

func GetConnections(db DBGetter, json JSONWriter) {
	connections := []Connection{}
	db.GetDb().Find(&connections)

	respConnections := []ConnectionResp{}

	for _, v := range connections {
		respConnections = append(respConnections, ConnectionResp{
			Id:    v.ID,
			Title: v.Title,
		})
	}

	json.OK(respConnections)
}

func GetConnection(db DBGetter, json JSONWriter) {

}
