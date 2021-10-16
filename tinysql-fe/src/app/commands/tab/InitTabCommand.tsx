import { Command, Mapper } from 'redux-commands'
import { AppState } from '../../model'

export class InitTabCommand extends Command<AppState> {
    process(): Mapper<AppState> {
        return (prev) => ({
            ...prev,
            tabs: [],
        })
    }
}
