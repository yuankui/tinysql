package main

import (
	"github.com/go-martini/martini"
)

/// 保存连接记录
func CreateConnect(db *DBGetter, params martini.Params, json JSONWriter, context martini.Context) {
	
	tp := params["type"]
	config := params["config"]
	title := params["title"]

	println(title)
	connection := Connection{
		Type:   tp,
		Config: config,
		Title:  title,
	}

	db.GetDb().Create(&connection)
	json.OK("OK")
}

func GetConnections(db *DBGetter, json JSONWriter) {
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

func GetConnection(db *DBGetter, json JSONWriter, params martini.Params, supporterFactory *SupporterFactory) {
	id := params["id"]

	var conn Connection
	db.GetDb().First(&conn, "id = ?", id)

	supporter := supporterFactory.GetSupporter(conn.Type)

	if supporter == nil {
		json.Error("no supporter found")
		return
	}

	connect := supporter.ConnectTo(conn.Config)
	databases := connect.ShowDatabases()

	var res ConnectionResp = ConnectionResp{
		Id:        conn.ID,
		Title:     conn.Title,
		Databases: databases,
	}

	json.OK(res)
}
