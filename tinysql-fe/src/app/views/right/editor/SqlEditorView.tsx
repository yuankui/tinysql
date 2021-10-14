import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FunctionComponent, useState } from 'react'
import { Controlled } from 'react-codemirror2'
import { useApi } from '../../../hooks'
import { format } from 'sql-formatter';

import 'codemirror/mode/sql/sql'
interface SqlEditorViewProps {
    onExec: (sql: string) => any
}

const SqlEditorView: FunctionComponent<SqlEditorViewProps> = ({onExec}) => {
    const api = useApi()

    const [sql, setSql] = useState("select * from json \nwhere name = 'hello'")

    return (
        <div className="rounded-md overflow-hidden shadow-sm border-1">
            {/* title */}
            <Controlled
                value={sql}
                options={{
                    mode: 'sql',
                    theme: 'default',
                    firstLineNumber: 1,
                    lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                    setSql(value)
                }}
            />
            <div className="flex flex-row-reverse items-center p-2 px-4 border-t-1">
                <div className="flex flex-row">
                    <Button 
                    onClick={e => {
                        setSql(format(sql));
                    }}
                    shape="round" icon={<MenuUnfoldOutlined />}>
                        格式化
                    </Button>
                    <Button
                    onClick={e => {
                        onExec && onExec(sql);
                    }}
                        className="ml-4"
                        type="primary"
                        shape="round"
                    >
                        执行
                    </Button>
                </div>
            </div>
            <div />
        </div>
    )
}

export default SqlEditorView
