import { Api, Connection } from './../api/index'

export interface AppState {
    api: Api
    connections?: Connection[],
}
