import { Tabs } from 'antd'
import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { SwitchTabCommand } from '../../commands/tab/SwitchTabCommand'
import { useSelector } from '../../hooks'
import SqlExecuteView from './SqlExecuteView'

interface ContentViewProps {
}

const ContentView: FunctionComponent<ContentViewProps> = ({
}) => {
    const tabs = useSelector((state) => state.tabs)
    const dispatch = useDispatch()

    let activeTabIndex = 0
    const tabViews = (tabs || []).map((t, i) => {
        if (t.open) {
            activeTabIndex = i
        }
        return (
            <Tabs.TabPane tab={t.connectionId + '/' + t.dbName} key={String(i)}>
                <SqlExecuteView
                    open={t.open}
                    connectionId={t.connectionId}
                    dbName={t.dbName}
                />
            </Tabs.TabPane>
        )
    })

    return (
        <Tabs
            onChange={(key) => {
                dispatch(new SwitchTabCommand(parseInt(key, undefined)))
            }}
            activeKey={String(activeTabIndex)}
            type="card"
            size={'middle'}
        >
            {tabViews}
        </Tabs>
    )
}

export default ContentView
