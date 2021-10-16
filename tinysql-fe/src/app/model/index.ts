import { Api, Connection } from './../api/index'

export interface Tab {
    connectionId: number,
    dbName: string,
    open: boolean,
}
export interface AppState {
    api: Api
    connections?: Connection[],
    tabs: Tab[],
}
