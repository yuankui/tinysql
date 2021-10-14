package supporter

type SqlSupporter interface {
	Type() string
	ConnectTo(config string)
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
