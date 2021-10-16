import { FunctionComponent, useState } from "react"
import { TableResult } from "../../api"
import { useApi } from "../../hooks"
import SqlEditorView from "./editor/SqlEditorView"
import SqlTableOutputView from "./output/SqlTableOutputView"

interface SqlExecuteViewProps {
    connectionId: number,
    dbName: string,
    open: boolean,
}
 
const SqlExecuteView: FunctionComponent<SqlExecuteViewProps> = ({connectionId, dbName}) => {

    const [result, setResult] = useState<TableResult>()
    const api = useApi()
    const [page, setPage] = useState(0)
    
    return <>
        <SqlEditorView
            onExec={async (sql) => {
                const res = await api.getQueryResult(connectionId, dbName, sql)
                setResult(res)
            }}
        />
        <SqlTableOutputView
            data={result}
            page={page}
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
        />
    </>
}
 
export default SqlExecuteView;