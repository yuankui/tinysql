import { useSelector as useReduxSelector } from 'react-redux'
import { AppState } from './model'

export function useSelector<S>(func: (s: AppState) => S) {
    return useReduxSelector(func)
}
