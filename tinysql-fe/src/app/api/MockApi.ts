import { Api, Connection, DataBase, Table } from './index'

export class MockApi implements Api {
    async getConnections(): Promise<Connection[]> {
        return [
            {
                id: 1,
                databases: [
                    {
                        name: "first_db",
                    },
                    {
                        name: "second_db",
                    },
                    {
                        name: "third_db",
                    }
                ]
            },
            {
                id: 2,
                databases: [
                    {
                        name: "first_db",
                    },
                    {
                        name: "second_db",
                    },
                    {
                        name: "third_db",
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
            databases: [
                {
                    name: "first_db",
                },
                {
                    name: "second_db",
                },
                {
                    name: "third_db",
                }
            ]
        }
    }
    async getDatabase(connectionId: number, database: string): Promise<DataBase> {
        return {
            name: database,
            tables: [
                {
                    name: "table1",
                },
                {
                    name: "table2",
                },
                {
                    name: "table3",
                }
            ]
        }
    }
    async getTable(connectionId: number, database: string, table: string): Promise<Table> {
        return {
            name: table,
            fields: [
                {
                    name: "field1",
                    type: "varchar(30)",     
                },
                {
                    name: "field2",
                    type: "varchar(20)",
                },
                {
                    name: "field3",
                    type: "bigint",
                }
            ]
        }
    }
}
