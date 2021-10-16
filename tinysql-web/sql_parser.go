package main

import (
	"github.com/blastrain/vitess-sqlparser/sqlparser"
)

type SqlType int

const (
	UnKnown SqlType = 0
	Select  SqlType = 1
	Update  SqlType = 2
)

func parse(sql string) (SqlType, error) {
	stmt, err := sqlparser.Parse(sql)
	if err != nil {
		return UnKnown, err
	}

	switch stmt.(type) {
	case *sqlparser.Select, *sqlparser.Show, *sqlparser.OtherRead:
		return Select, nil
	case *sqlparser.Update, *sqlparser.Delete, *sqlparser.DDL:
		return Update, nil
	}

	return UnKnown, nil
}
