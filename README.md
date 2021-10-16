# tinysql

## 架构


```
fe(:3000) => web(:3001) => query(mysql)
                        |
                        |
                      sqlite 
```


## Concepts

### Connection

A (type, config) pair that support the estiblish a SQL connection to a sql backend, like

- mysql(host, port, user, pass)
- sqlite(file path)

### Database

In a connection ,there may be at least one database

### Table

In a database, there are some table

### Field

In a table, there are some fields
