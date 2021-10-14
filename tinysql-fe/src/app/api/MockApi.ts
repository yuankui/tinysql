import { Api, Connection, DataBase, Table } from './index'

export class MockApi implements Api {
    async getConnections(): Promise<Connection[]> {
        return [
            {
                id: 1,
                title: "First Connection",
                databases: [
                    {
                        name: "first_db",
                        connectionId: 1,
                    },
                    {
                        name: "second_db",
                        connectionId: 1,
                    },
                    {
                        name: "third_db",
                        connectionId: 1,
                    }
                ]
            },
            {
                id: 2,
                title: "First Connection",
                databases: [
                    {
                        name: "first_db",
                        connectionId: 2,
                    },
                    {
                        name: "second_db",
                        connectionId: 2,
                    },
                    {
                        name: "third_db",
                        connectionId: 2,
                    }
                ]
            }
        ]
    }
    
    async createConnection(type: string, config: any): Promise<number> {
        return 1
    }

    async getConnection(id: number): Promise<Connection> {
        return {
            id,
            title: "First Connection",
            databases: [
                {
                    name: "first_db",
                    connectionId: id,
                },
                {
                    name: "second_db",
                    connectionId: id,
                },
                {
                    name: "third_db",
                    connectionId: id,
                }
            ]
        }
    }
    async getDatabase(connectionId: number, database: string): Promise<DataBase> {
        return {
            name: database,
            connectionId,
            tables: [
                {
                    name: "table1",
                    connectionId,
                    dbName: database,
                },
                {
                    name: "table2",
                    connectionId,
                    dbName: database,
                },
                {
                    name: "table3",
                    connectionId,
                    dbName: database,
                }
            ]
        }
    }
    async getTable(connectionId: number, database: string, table: string): Promise<Table> {
        return {
            name: table,
            connectionId,
            dbName: database,
            fields: [
                {
                    name: "field1",
                    type: "varchar(30)",
                    comment: "字段1",
                },
                {
                    name: "field2",
                    type: "varchar(20)",
                    comment: "字段1",
                },
                {
                    name: "field3",
                    type: "bigint",
                    comment: "字段1xxxxxxxxxxxxxxxx",
                }
            ]
        }
    }
}
