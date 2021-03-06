import { EllipsisOutlined, LinkOutlined } from '@ant-design/icons'
import { FunctionComponent, ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Connection, DataBase } from '../../api'
import { DeleteConnectionsCommand as DeleteConnectionCommand } from '../../commands/DeleteConnectionCommand'
import { If, sleep } from '../../common'
import { Action } from '../../common/popup'
import PopupButton from '../../common/popup/PopupButton'
import { useApi } from '../../hooks'
import DatabaseView from './DatabaseView'
import NodeView from './NodeView'

interface ConnectionViewProps {
    connection: Connection
}

const ConnectionView: FunctionComponent<ConnectionViewProps> = ({
    connection,
}) => {
    const [databases, setDatabases] = useState<string[]>([])
    const api = useApi()
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)
    const dispatch = useDispatch()

    const actions: Action[] = [
        {
            title: '删除',
            confirmMessage: '确认删除吗？',
            onClick() {
                dispatch(new DeleteConnectionCommand(connection.id))
            },
        },
    ]

    const actionButton: ReactNode = (
        <PopupButton actions={actions}>
            <EllipsisOutlined />
        </PopupButton>
    )

    return (
        <div className="">
            <NodeView
                expand={expand}
                className="flex flex-row items-center"
                loading={loading}
                onClick={() => {}}
                onExpand={async () => {
                    if (expand) {
                        setExpand(false)
                        return
                    }

                    // 展开
                    setLoading(true)
                    const conn = await api.getConnection(connection.id)
                    await sleep(200)
                    setLoading(false)
                    setDatabases(conn.databases)
                    setExpand(true)
                }}
                trailing={actionButton}
            >
                <LinkOutlined className="mr-2" />
                <span>{connection.title}</span>
            </NodeView>
            {/* databases */}
            <div className="pl-4">
                <If test={expand}>
                    {databases.map((db) => {
                        return (
                            <DatabaseView
                                key={db}
                                database={{
                                    connectionId: connection.id,
                                    name: db,
                                }}
                            />
                        )
                    })}
                </If>
            </div>
        </div>
    )
}

export default ConnectionView
