import { DatabaseOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { DataBase } from '../../api'
import { If, sleep } from '../../common'
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

    return (
        <div>
            <NodeView
                className='flex flex-row items-center'
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
            >
                <DatabaseOutlined className="mr-2" />
                <span>{database.name}</span>
            </NodeView>
            <div className="pl-4">
                <If test={expand}>
                    {tables?.map((t) => {
                        return <TableView key={t} table={{
                            connectionId: database.connectionId,
                            dbName: database.name,
                            name: t,
                        }} />
                    })}
                </If>
            </div>
        </div>
    )
}

export default DatabaseView
