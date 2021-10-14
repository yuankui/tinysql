import { FunctionComponent, useState } from 'react'
import { Connection, DataBase } from '../../api'
import { sleep } from '../../common'
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
    const api = useApi();
    const [loading, setLoading] = useState(false);
    const [expand, setExpand] = useState(false);

    return (
        <div className="bg-gray-400 h-52 m-4">
            <NodeView
                expand={expand}
                loading={loading}
                onClick={() => {}}
                onExpand={async () => {
                    if (expand) {
                        setExpand(false);
                        return;
                    }

                    // 展开
                    setLoading(true);
                    const conn = await api.getConnection(connection.id);
                    await sleep(200);
                    setLoading(false);
                    setDatabases(conn.databases);
                    setExpand(true);
                }}
            >
                {connection.title}
            </NodeView>
            {/* databases */}
            <div className='pl-4'>
            {
                databases.map(db => {
                    return <DatabaseView key={db.name} database={db}/>
                })
            }
            </div>
        </div>
    )
}

export default ConnectionView
