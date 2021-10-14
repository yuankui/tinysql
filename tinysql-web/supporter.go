package main

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

type Dataset struct {
	Fields []string
	Data   [][]interface{}
}

type SupporterFactory struct{}

func (m *SupporterFactory) GetSupporters() []SqlSupporter {
	supporters := []SqlSupporter{
		&MysqlSupporter{},
	}
	return supporters
}

func (m *SupporterFactory) GetSupporter(Type string) SqlSupporter {
	for _, supporter := range m.GetSupporters() {
		if supporter.Type() == Type {
			return supporter
		}
	}
	return nil
}
