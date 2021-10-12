// connection => n * DB => n * Table => n * Field

export interface Api {
    /**
     *
     * @param type mysql/sqlite/PostgreSQL
     * @param config
     *
     * @returns ID
     */
    createConnection(type: string, config: any): Promise<number>
    getConnection(id: number): Promise<Connection>
    getConnections(): Promise<Connection[]>,
    getDatabase(connectionId: number, database: string): Promise<DataBase>
    getTable(connectionId: number, database: string, table: string): Promise<Table>
}

export interface Connection {
    id: number,
    title: string,
    databases: DataBase[]
}

export interface DataBase {
    name: string
    tables?: Table[]
}

export interface Table {
    name: string
    fields?: Field[]
}

export interface Field {
    name: string
    type: string
}
