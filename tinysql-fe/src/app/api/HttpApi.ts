import { Api, Connection, DataBase, Table, TableResult } from './index'
export class HttpApi implements Api {
    private readonly host: string

    constructor(host: string) {
        this.host = host
    }

    async createConnection(
        title: string,
        type: string,
        config: any
    ): Promise<number> {
        const resp = await fetch(this.host + '/tinysql/create', {
            method: 'post',
            body: JSON.stringify({
                title,
                type,
                config,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })

        const ret = await resp.json()
        if (ret.code !== 0) {
            throw new Error(ret.msg)
        }
        return ret.data
    }

    async getConnection(id: number): Promise<Connection> {
        const resp = await fetch(this.host + '/tinysql/connection/' + id)
        const json = await resp.json()
        if (json.code !== 0) {
            throw new Error(json.msg)
        }
        return json.data
    }

    async getConnections(): Promise<Connection[]> {
        const resp = await fetch(this.host + '/tinysql/connections')
        const json = await resp.json()
        if (json.code !== 0) {
            throw new Error(json.msg)
        }
        return json.data
    }

    async getDatabase(connectionId: number, database: string): Promise<DataBase> {
        const resp = await fetch(`${this.host}/tinysql/database?connectionId=${connectionId}&dbName=${database}`)
        const json = await resp.json()
        if (json.code !== 0) {
            throw new Error(json.msg)
        }
        return json.data
    }

    async getTable(
        connectionId: number,
        database: string,
        table: string
    ): Promise<Table> {
        const resp = await fetch(`${this.host}/tinysql/table?connectionId=${connectionId}&dbName=${database}&table=${table}`)
        const json = await resp.json()
        if (json.code !== 0) {
            throw new Error(json.msg)
        }
        return json.data
    }

    getQueryResult(
        connectionId: number,
        database: string,
        sql: string
    ): Promise<TableResult> {
        throw new Error('Method not implemented.')
    }
}
