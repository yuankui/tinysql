import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { Command, Mapper } from 'redux-commands';
import { AppState } from '../model';

export class UpdateConnectionsCommand extends Command<AppState> {
    async process(
        store: MiddlewareAPI<Dispatch<AnyAction>, AppState>
    ): Promise<Mapper<AppState>> {
        // 通过API获取连接
        const connections = await store.getState().api.getConnections();
        return prev => ({
            ...prev,
            connections,
        })
    }
}
