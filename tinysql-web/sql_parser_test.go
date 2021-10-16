package main

import (
	"testing"
)

func TestHelloName(t *testing.T) {
	sqlType, err := parse("select * from table1 where a > 11")
	if err != nil {
		panic(err)
	}

	t.Error(sqlType)

}
