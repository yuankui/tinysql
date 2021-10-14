package main

type ConnectionResp struct {
	Id        uint      `json:"id"`
	Title     string    `json:"title"`
	Databases DataBases `json:"databases"`
}

type DataBases struct {
	ConnectionId uint    `json:"connectionId"`
	Name         string  `json:"name"`
	Tables       []Table `json:"tables"`
}

type Table struct {
	ConnectionId uint     `json:"connectionId"`
	DbName       string   `json:"dbName"`
	Name         string   `json:"name"`
	Fields       []string `json:"fields"`
}

type Field struct {
	Name    string `json:"name"`
	Type    string `json:"type"`
	Comment string `json:"comment"`
}
