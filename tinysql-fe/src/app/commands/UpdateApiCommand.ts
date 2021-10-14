import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { Command, Mapper } from 'redux-commands';
import { AppState } from '../model';
import { HttpApi } from './../api/HttpApi';

export class UpdateApiCommand extends Command<AppState> {
    process(
        store: MiddlewareAPI<Dispatch<AnyAction>, AppState>
    ): Mapper<AppState> {
        return () => ({
            api: new HttpApi(''),
        })
    }
}
