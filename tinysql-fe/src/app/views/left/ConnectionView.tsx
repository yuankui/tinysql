import { LinkOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { Connection, DataBase } from '../../api'
import { If, sleep } from '../../common'
import { useApi } from '../../hooks'
import DatabaseView from './DatabaseView'
import NodeView from './NodeView'

interface ConnectionViewProps {
    connection: Connection
}

const ConnectionView: FunctionComponent<ConnectionViewProps> = ({
    connection,
}) => {
    const [databases, setDatabases] = useState<DataBase[]>([])
    const api = useApi()
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)

    return (
        <div className="bg-gray-400 h-52 m-4">
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
            >
                <LinkOutlined className="mr-2" />
                <span>{connection.title}</span>
            </NodeView>
            {/* databases */}
            <div className="pl-4">
                <If test={expand}>
                    {databases.map((db) => {
                        return <DatabaseView key={db.name} database={db} />
                    })}
                </If>
            </div>
        </div>
    )
}

export default ConnectionView
