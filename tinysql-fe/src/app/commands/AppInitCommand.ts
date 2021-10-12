import { MockApi } from './../api/MockApi'
import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import { Command, Mapper } from 'redux-commands'
import { AppState } from '../model'

export class AppInitCommand extends Command<AppState> {
    process(
        store: MiddlewareAPI<Dispatch<AnyAction>, AppState>
    ): Mapper<AppState> {
        return () => ({
            api: new MockApi(),
            
        })
    }
}
