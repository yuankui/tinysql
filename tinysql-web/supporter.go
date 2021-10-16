package main

type SqlSupporter interface {
	Type() string
	ConnectTo(config string) Connect
}

type Connect interface {
	ExecSelect(db string, sql string) (*Dataset, error)
	ExecUpdate(db string, sql string) (string, error)
	ShowDatabases() []string
	ShowTables(db string) []string
	ShowFields(db string, tb string) []Field
}

type Dataset struct {
	Fields []string        `json:"fields"`
	Data   [][]interface{} `json:"data"`
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
