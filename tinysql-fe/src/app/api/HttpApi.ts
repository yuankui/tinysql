import { Api, Connection, DataBase, Table, TableResult } from './index'
export class HttpApi implements Api {
    private readonly host: string

    constructor(host: string) {
        this.host = host
    }

    async createConnection(title: string, type: string, config: any): Promise<number> {
        fetch(this.host + '/tinysql/create', {
            method: 'post',
            
        })
    }
    getConnection(id: number): Promise<Connection> {
        throw new Error('Method not implemented.')
    }
    getConnections(): Promise<Connection[]> {
        throw new Error('Method not implemented.')
    }
    getDatabase(connectionId: number, database: string): Promise<DataBase> {
        throw new Error('Method not implemented.')
    }
    getTable(
        connectionId: number,
        database: string,
        table: string
    ): Promise<Table> {
        throw new Error('Method not implemented.')
    }
    getQueryResult(
        connectionId: number,
        database: string,
        sql: string
    ): Promise<TableResult> {
        throw new Error('Method not implemented.')
    }
}
