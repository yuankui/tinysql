import { Command, Mapper } from 'redux-commands'
import { AppState } from '../../model'

export class SwitchTabCommand extends Command<AppState> {
    private readonly i: number

    constructor(i: number) {
        super()
        this.i = i
    }

    process(): Mapper<AppState> {
        return (prev) => {
            const newTabs = prev.tabs.map((t, i) => {
                // 打开的标签
                if (i === this.i) {
                    return {
                        ...t,
                        open: true,
                    }
                } else if (t.open) {
                    // 之前打开的标签，现在关闭
                    return {
                        ...t,
                        open: false,
                    }
                } else {
                    // 其他标签，保持不动
                    return t
                }
            })

            return {
                ...prev,
                tabs: newTabs,
            }
        }
    }
}
