package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type MysqlSupporter struct {
}

func (m *MysqlSupporter) Type() string {
	return "mysql"
}

type MysqlConfig struct {
	Host string `json:"host"`
	Port int    `json:"port"`
	User string `json:"user"`
	Pass string `json:"pass"`
}

func (c *MysqlConfig) connectString() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/?charset=utf8mb4&parseTime=True&loc=Local", c.User, c.Pass, c.Host, c.Port)
}

func (m *MysqlSupporter) ConnectTo(config string) Connect {
	conf := MysqlConfig{}
	err := json.Unmarshal([]byte(config), &conf)
	if err != nil {
		panic(err)
	}
	dsn := conf.connectString()

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}

	conn := MysqlConnect{
		db: db,
	}
	return &conn
}

type MysqlConnect struct {
	db *sql.DB
}

func (m *MysqlConnect) ExecSelect(db string, sql string) (*Dataset, error) {
	m.db.Exec("use " + db)
	rows, err := m.db.Query(sql)
	if err != nil {
		return nil, err
	}
	fields, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	lines := [][]interface{}{}

	for rows.Next() {
		var row []interface{} = make([]interface{}, len(fields))
		for i, _ := range row {
			row[i] = new(string)
		}

		rows.Scan(row...)
		lines = append(lines, row)
	}

	return &Dataset{
		Fields: fields,
		Data:   lines,
	}, nil
}

func (m *MysqlConnect) ShowDatabases() []string {
	res, err := m.db.Query("show databases")

	defer res.Close()

	if err != nil {
		panic(err)
	}

	lines := []string{}

	for res.Next() {
		var line string
		res.Scan(&line)
		lines = append(lines, line)
	}

	return lines
}

func (m *MysqlConnect) ShowTables(db string) []string {
	_, err := m.db.Exec(fmt.Sprintf("use %s;", db))

	if err != nil {
		panic(err)
	}

	res, err := m.db.Query("show tables")
	defer res.Close()
	if err != nil {
		panic(err)
	}

	lines := []string{}

	for res.Next() {
		var line string
		res.Scan(&line)
		lines = append(lines, line)
	}
	return lines
}

func (m *MysqlConnect) ShowFields(db string, tb string) []Field {
	res, err := m.db.Query("SHOW FULL COLUMNS FROM " + db + "." + tb)
	if err != nil {
		panic(err)
	}
	defer res.Close()

	fields := []Field{}

	for res.Next() {
		var field string
		var Type string
		var Collation string
		var Null string
		var Key string
		var Default string
		var Extra string
		var Priviledge string
		var Comment string

		res.Scan(&field, &Type, &Collation, &Null, &Key, &Default, &Extra, &Priviledge, &Comment)
		fields = append(fields, Field{
			Name:    field,
			Type:    Type,
			Comment: Comment,
		})
	}
	return fields
}

func (m *MysqlConnect) ExecUpdate(db string, sql string) (string, error) {
	panic("not implement")
}
