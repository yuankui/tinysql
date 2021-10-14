package main

import (
	"encoding/json"
	"net/http"

	"github.com/go-martini/martini"
)

type JSONWriter struct {
	res http.ResponseWriter
}

type JSONWrite interface {
	OK(resp interface{})
	Error(msg string)
}

type Result struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

func (writer *JSONWriter) OK(resp interface{}) {
	writer.res.Header().Add("Content-Type", "application/json")

	jsonStr, err := json.Marshal(Result {
		Code: 0,
		Msg: "",
		Data: resp,
	})

	if err == nil {
		writer.res.Write(jsonStr)
	} else {
		writer.Error("parse json error")
	}
}

func (writer * JSONWriter) Error(msg string) {
	errorJson, _ := json.Marshal(Result {
		Code: 1,
		Msg: "parse JSON ERROR",
	})
	writer.res.Write(errorJson)
}

func InjectJSONWriter() martini.Handler {
	return func(res http.ResponseWriter, req *http.Request, c martini.Context) {

		c.MapTo(&JSONWriter{res: res}, (*JSONWrite)(nil))
	}
}
