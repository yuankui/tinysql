import { Api, Connection, DataBase, Table } from './index'

export class MockApi implements Api {
    createConnection(type: string, config: any): number {
        return 1
    }
    getConnection(id: number): Connection {
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
    getDatabase(connectionId: number, database: string): DataBase {
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
    getTable(connectionId: number, database: string, table: string): Table {
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
