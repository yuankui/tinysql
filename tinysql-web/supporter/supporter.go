package supporter

type SqlSupporter interface {
	Type() string
	ConnectTo(config string) Connect
}

type Connect interface {
	Exec(sql string) Dataset
	ShowDatabases() []string
	ShowTables(db string) []string
	ShowFields(db string, tb string) []Field
}

type Field struct {
	Name    string
	Type    string
	Comment string
}
type Dataset struct {
	Fields []string
	Data   [][]interface{}
}



func GetSupporters() map[string]SqlSupporter {
	mysql := MysqlSupporter {}
	var conn SqlSupporter = &mysql

	return map[string]SqlSupporter{
		"hello": conn,
	}
}

