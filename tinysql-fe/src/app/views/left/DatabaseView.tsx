import { DatabaseOutlined, EllipsisOutlined } from '@ant-design/icons'
import { FunctionComponent, ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DataBase } from '../../api'
import { OpenTabCommand } from '../../commands/tab/OpenTabCommand'
import { If, sleep } from '../../common'
import { Action } from '../../common/popup'
import PopupButton from '../../common/popup/PopupButton'
import { useApi } from '../../hooks'
import NodeView from './NodeView'
import TableView from './TableView'

interface DatabaseViewProps {
    database: DataBase
}

const DatabaseView: FunctionComponent<DatabaseViewProps> = ({ database }) => {
    const [tables, setTables] = useState(database.tables)
    const [expand, setExpand] = useState(false)
    const [loading, setLoading] = useState(false)
    const api = useApi()

    const dispatch = useDispatch()

    const actions: Action[] = [
        {
            title: '新建SQL',
            onClick() {
                dispatch(
                    new OpenTabCommand(database.connectionId, database.name)
                )
            },
        },
    ]

    const actionButton: ReactNode = (
        <PopupButton actions={actions}>
            <EllipsisOutlined />
        </PopupButton>
    )

    return (
        <div>
            <NodeView
                className="flex flex-row items-center"
                expand={expand}
                loading={loading}
                onClick={() => {}}
                onExpand={async () => {
                    if (!expand) {
                        setLoading(true)
                        await sleep(300)
                        const db = await api.getDatabase(
                            database.connectionId,
                            database.name
                        )
                        setTables(db.tables)
                        setLoading(false)
                    }
                    setExpand((prev) => !prev)
                }}
                trailing={actionButton}
            >
                <DatabaseOutlined className="mr-2" />
                <span>{database.name}</span>
            </NodeView>
            <div className="pl-4">
                <If test={expand}>
                    {tables?.map((t) => {
                        return (
                            <TableView
                                key={t}
                                table={{
                                    connectionId: database.connectionId,
                                    dbName: database.name,
                                    name: t,
                                }}
                            />
                        )
                    })}
                </If>
            </div>
        </div>
    )
}

export default DatabaseView
