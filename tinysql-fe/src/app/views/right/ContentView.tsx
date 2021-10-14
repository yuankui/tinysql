import { Tabs } from 'antd'
import { FunctionComponent, useState } from 'react'
import { TableResult } from '../../api'
import { useApi } from '../../hooks'
import SqlEditorView from './editor/SqlEditorView'
import SqlTableOutputView from './output/SqlTableOutputView'

interface ContentViewProps {}

const ContentView: FunctionComponent<ContentViewProps> = () => {
    const [result, setResult] = useState<TableResult>();
    const api = useApi();

    return (
        <Tabs defaultActiveKey="1" type="card" size={'middle'}>
            <Tabs.TabPane tab="Card Tab 1" key="1">
                <SqlEditorView onExec={async sql => {
                    const res = await api.getQueryResult(1, "", "");
                    setResult(res);
                }} />
                <SqlTableOutputView data={result}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Card Tab 2" key="2">
                Content of card tab 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Card Tab 3" key="3">
                Content of card tab 3
            </Tabs.TabPane>
        </Tabs>
    )
}

export default ContentView
