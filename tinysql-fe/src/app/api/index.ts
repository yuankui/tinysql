// connection => n * DB => n * Table => n * Field

export interface Api {
    /**
     *
     * @param type mysql/sqlite/PostgreSQL
     * @param config
     *
     * @returns ID
     */
    createConnection(title: string, type: string, config: any): Promise<number>
    getConnection(id: number): Promise<Connection>
    getConnections(): Promise<Connection[]>,
    getDatabase(connectionId: number, database: string): Promise<DataBase>
    getTable(connectionId: number, database: string, table: string): Promise<Table>
    getQueryResult(connectionId: number, database: string, sql: string): Promise<TableResult>,
}

export interface TableResult {
    fields: string[],
    data: string[][]
    
}
export interface Connection {
    id: number,
    title: string,
    databases: string[]
}

export interface DataBase {
    connectionId: number,
    name: string
    tables?: string[]
}

export interface Table {
    connectionId: number,
    dbName: string,
    name: string
    fields?: Field[]
}

export interface Field {
    name: string
    type: string
    comment: string
}
