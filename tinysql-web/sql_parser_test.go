package main

import "testing"

func TestHelloName(t *testing.T) {
	parse("select * from table where a > 11")
}
