import { Api, Connection, DataBase, Table, TableResult } from './index'

export class MockApi implements Api {
    deleteConnection(id: number): Promise<void> {
        throw new Error('Method not implemented.')
    }
    async getQueryResult(
        connectionId: number,
        database: string,
        sql: string
    ): Promise<TableResult> {
        return {
            fields: ['name', 'age', 'favors'],
            data: Array(10).fill([
                'yuankui',
                33,
                'backetball, climbing, tennis',
            ]),
        }
    }
    async getConnections(): Promise<Connection[]> {
        return [
            {
                id: 1,
                title: 'First Connection',
                databases: ['first_db', 'second_db'],
            },
            {
                id: 2,
                title: 'First Connection',
                databases: ['first_db', 'second_db'],
            },
        ]
    }

    async createConnection(
        title: string,
        type: string,
        config: any
    ): Promise<number> {
        return 1
    }

    async getConnection(id: number): Promise<Connection> {
        return {
            id,
            title: 'First Connection',
            databases: ['first_db', 'second_db'],
        }
    }
    async getDatabase(
        connectionId: number,
        database: string
    ): Promise<DataBase> {
        return {
            name: database,
            connectionId,
            tables: ['first_db', 'second_db'],
        }
    }
    async getTable(
        connectionId: number,
        database: string,
        table: string
    ): Promise<Table> {
        return {
            name: table,
            connectionId,
            dbName: database,
            fields: [
                {
                    name: 'field1',
                    type: 'varchar(30)',
                    comment: '字段1',
                },
                {
                    name: 'field2',
                    type: 'varchar(20)',
                    comment: '字段1',
                },
                {
                    name: 'field3',
                    type: 'bigint',
                    comment: '字段1xxxxxxxxxxxxxxxx',
                },
            ],
        }
    }
}
