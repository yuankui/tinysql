import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { Command } from 'redux-commands';
import { AppState } from '../model';
import { UpdateApiCommand } from './UpdateApiCommand';
import { UpdateConnectionsCommand } from './UpdateConnectionsCommand';

export class AppInitCommand extends Command<AppState> {
    async process(
        store: MiddlewareAPI<Dispatch<AnyAction>, AppState>
    ): Promise<void> {
        await store.dispatch(new UpdateApiCommand())
        await store.dispatch(new UpdateConnectionsCommand())
    }
}
