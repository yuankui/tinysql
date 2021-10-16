import { Command, Mapper } from 'redux-commands'
import { AppState, Tab } from '../../model'

export class OpenTabCommand extends Command<AppState> {
    private readonly connectionId: number
    private readonly dbName: string

    constructor(connectionId: number, dbName: string) {
        super()
        this.connectionId = connectionId
        this.dbName = dbName
    }

    process(): Mapper<AppState> {
        return (prev) => {
            // 查找是否有同名标签
            const exist =
                prev.tabs.filter((t) => {
                    return (
                        t.connectionId === this.connectionId &&
                        t.dbName === this.dbName
                    )
                }).length !== 0

            
            let newTabs: Tab[] = []
            if (exist) {
                // 如果已经有同名tab打开，就
                // 1. 标记之前的tab为关闭
                // 2. 标记该tab为打开
                newTabs = prev.tabs.map((t) => {
                    // 新打开标签
                    if (
                        t.connectionId === this.connectionId &&
                        t.dbName === this.dbName
                    ) {
                        return {
                            ...t,
                            open: true,
                        }
                        // 之前的打开标签
                    } else if (t.open) {
                        return {
                            ...t,
                            open: false,
                        }
                        // 之前的未打开标签
                    } else {
                        return t
                    }
                })
            } else {
                // 如果没有同名tab打开，就
                // 1. 标记之前的tab为关闭
                // 2. 新开一个tab最后，然后设置为打开
                const oldTabs = prev.tabs.map(t => {
                    if (t.open) {
                        return {
                            ...t,
                            open: false
                        }
                    } else {
                        return t
                    }
                })
                newTabs = [...oldTabs, {
                    connectionId: this.connectionId,
                    dbName: this.dbName,
                    open: true,
                }]
            }
            return {
                ...prev,
                tabs: newTabs,
            }
        }
    }
}
