import { TableOutlined, TagOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { Table } from '../../api'
import { If, sleep } from '../../common'
import { useApi } from '../../hooks'
import NodeView from './NodeView'

interface TableViewProps {
    table: Table
}

const TableView: FunctionComponent<TableViewProps> = ({ table }) => {
    const [fields, setFields] = useState(table.fields)
    const [expand, setExpand] = useState(false)
    const [loading, setLoading] = useState(false)
    const api = useApi()

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
                        const tb = await api.getTable(
                            table.connectionId,
                            table.dbName,
                            table.name
                        )
                        setFields(tb.fields)
                        setLoading(false)
                    }

                    setExpand((prev) => !prev)
                }}
            >
                <TableOutlined className="mr-2" />
                <span>{table.name}</span>
            </NodeView>
            <div className="pl-8">
                <If test={expand}>
                    {(fields || []).map((f) => {
                        return (
                            <div key={f.name} className="flex flex-row items-center justify-start overflow-hidden">
                                <TagOutlined className='mr-2' />
                                <div className='mr-2'>{f.name}</div>
                                <div className='opacity-50 mr-2'>{f.type}</div>
                                <div className='ellipsis-item'>{f.comment}</div>
                            </div>
                        )
                    })}
                </If>
            </div>
        </div>
    )
}

export default TableView
