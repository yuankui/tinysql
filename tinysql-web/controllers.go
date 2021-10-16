package main

import (
	"github.com/go-martini/martini"
)

/// 保存连接记录
func CreateConnect(db *DBGetter, params martini.Params, context TinyContext) {

	var conn Connection
	err := context.ParseBody(&conn)

	if err != nil {
		context.Error(err.Error())
		return
	}

	db.GetDb().Create(&conn)
	context.OK("OK")
}

/// 删除连接记录
func DeleteConnect(db *DBGetter, params martini.Params, context TinyContext) {
	id := params["id"]

	db.GetDb().Delete(&Connection{}, id)
	context.OK("OK")
}

/// 获取所有连接
func GetConnections(db *DBGetter, json TinyContext) {
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

/// 根据连接ID，获取改连接下面的DB列表
func GetConnection(db *DBGetter, json TinyContext, params martini.Params, supporterFactory *SupporterFactory) {
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

/// 获取表列表
func GetDatabase(db *DBGetter, context TinyContext, params martini.Params, supporterFactory *SupporterFactory) {
	id := context.GetUrlParamInt("connectionId")
	name := context.GetUrlParam("dbName")

	var conn Connection
	db.GetDb().First(&conn, "id = ?", id)

	supporter := supporterFactory.GetSupporter(conn.Type)

	if supporter == nil {
		context.Error("no supporter found")
		return
	}

	connect := supporter.ConnectTo(conn.Config)
	tables := connect.ShowTables(name)

	var res DataBase = DataBase{
		ConnectionId: uint(id),
		Name:         name,
		Tables:       tables,
	}

	context.OK(res)
}

/// 获取表信息
func GetTable(db *DBGetter, context TinyContext, params martini.Params, supporterFactory *SupporterFactory) {
	connectionId := context.GetUrlParamInt("connectionId")
	dbName := context.GetUrlParam("dbName")
	tableName := context.GetUrlParam("table")

	var conn Connection
	db.GetDb().First(&conn, "id = ?", connectionId)

	supporter := supporterFactory.GetSupporter(conn.Type)

	if supporter == nil {
		context.Error("no supporter found")
		return
	}

	connect := supporter.ConnectTo(conn.Config)
	fields := connect.ShowFields(dbName, tableName)

	var res Table = Table{
		ConnectionId: uint(connectionId),
		Name:         dbName,
		DbName:       dbName,
		Fields:       fields,
	}

	context.OK(res)
}

func ExecuteSql(db *DBGetter, context TinyContext, params martini.Params, supporterFactory *SupporterFactory) {
	sql := context.GetUrlParam("sql")
	connectionId := context.GetUrlParamInt("connectionId")
	dbName := context.GetUrlParam("db")

	sqlType, err := parse(sql)
	if err != nil {
		context.Error(err.Error())
		return
	}

	// 获取supporter
	var conn Connection
	db.GetDb().First(&conn, "id = ?", connectionId)

	supporter := supporterFactory.GetSupporter(conn.Type)

	if supporter == nil {
		context.Error("no supporter found")
		return
	}

	connect := supporter.ConnectTo(conn.Config)

	switch sqlType {
	case Select:
		res, err := connect.ExecSelect(dbName, sql)
		if err != nil {
			context.Error(err.Error())
		} else {
			context.OK(res)
		}
		return
	case Update:
		res, err := connect.ExecUpdate(dbName, sql)
		if err != nil {
			context.Error(err.Error())
		} else {
			context.OK(res)
		}
	}
}
