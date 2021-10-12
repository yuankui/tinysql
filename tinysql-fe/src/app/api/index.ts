// connection => n * DB => n * Table => n * Field

export interface Api {
    /**
     *
     * @param type mysql/sqlite/PostgreSQL
     * @param config
     *
     * @returns ID
     */
    createConnection(type: string, config: any): number
    getConnection(id: number): Connection
    getDatabase(connectionId: number, database: string): DataBase
    getTable(connectionId: number, database: string, table: string): Table
}

export interface Connection {
    id: number,
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
