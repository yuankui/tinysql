import { CSSProperties, FunctionComponent } from 'react'
import { Command } from 'redux-commands'
import { AppState } from './model'

export function innerValueOnChange<T, K extends keyof T>(valueOnChange: ValueOnChange<T>, key: K): ValueOnChange<T[K]> {
    const { value = {} as any, onChange } = valueOnChange || {}
    return {
        value: value[key],
        onChange: (p: T[K]) => {
            onChange({
                ...value,
                [key]: p,
            })
        },
    }
}

export function indexValueOnChange<T>(valueOnChange: ValueOnChange<Array<T>>, index: number): ValueOnChange<T> {
    const { value = {} as any, onChange } = valueOnChange
    return {
        value: value[index],
        onChange: (p: T) => {
            const newArr = value.map((t: Array<T>, i: number) => {
                if (i === index) {
                    return p
                }
                return t
            })
            onChange(newArr)
        },
    }
}
export const center = (): CSSProperties => {
    return {
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export type OnChange<T> = (value: T) => any

export interface ValueOnChange<T> {
    value: T
    onChange: OnChange<T>
}

interface Props {
    test: boolean
}

export const If: FunctionComponent<Props> = (props) => {
    if (props.test) {
        return props.children
    }
    return null as any
}

export abstract class AppCommand extends Command<AppState> {}
