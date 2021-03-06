package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/go-martini/martini"
)

type tinyContext struct {
	res http.ResponseWriter
	req *http.Request
}

type TinyContext interface {
	OK(resp interface{})
	Error(msg string)
	GetUrlParam(name string) string
	GetUrlParamInt(name string) int
	ParseBody(model interface{}) error
}

type Result struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

func (context *tinyContext) OK(resp interface{}) {
	context.res.Header().Add("Content-Type", "application/json")

	jsonStr, err := json.Marshal(Result{
		Code: 0,
		Msg:  "",
		Data: resp,
	})

	if err == nil {
		context.res.Write(jsonStr)
	} else {
		context.Error("parse json error")
	}
}

func (context *tinyContext) Error(msg string) {
	errorJson, _ := json.Marshal(Result{
		Code: 1,
		Msg:  "parse JSON ERROR",
	})
	context.res.Write(errorJson)
}

func (context *tinyContext) GetUrlParam(name string) string {
	fmt.Println(context.req.URL.Query())
	return context.req.URL.Query().Get(name)
}

func (context *tinyContext) GetUrlParamInt(name string) int {
	value := context.GetUrlParam(name)
	ret, err := strconv.Atoi(value)
	if err != nil {
		return 0
	}
	return ret
}

func (context *tinyContext) ParseBody(model interface{}) error {
	bytes, err := ioutil.ReadAll(context.req.Body)
	if err != nil {
		return err
	}

	err = json.Unmarshal(bytes, model)
	return err
}
func InjectTinyContext() martini.Handler {
	return func(res http.ResponseWriter, req *http.Request, c martini.Context) {

		c.MapTo(&tinyContext{
			res: res,
			req: req,
		}, (*TinyContext)(nil))
	}
}
