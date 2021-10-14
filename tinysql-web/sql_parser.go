package main

import (
	"fmt"

	"github.com/blastrain/vitess-sqlparser/sqlparser"
)

func parse(sql string) {
	stmt, err := sqlparser.Parse("select * from user_items where user_id=1 order by created_at limit 3 offset 10")
	if err != nil {
		panic(err)
	}

	
	fmt.Printf("stmt = %+v\n", stmt)
}
