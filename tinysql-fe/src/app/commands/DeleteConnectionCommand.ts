import { AnyAction, Dispatch, MiddlewareAPI } from 'redux'
import { Command } from 'redux-commands'
import { AppState } from '../model'
import { UpdateConnectionsCommand } from './UpdateConnectionsCommand'

export class DeleteConnectionsCommand extends Command<AppState> {
    private readonly id: number

    constructor(id: number) {
        super()
        this.id = id
    }

    async process(
        store: MiddlewareAPI<Dispatch<AnyAction>, AppState>
    ): Promise<void> {
        // 通过API获取连接
        await store.getState().api.deleteConnection(this.id)
        await store.dispatch(new UpdateConnectionsCommand())
    }
}
