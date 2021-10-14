import { FunctionComponent, useState } from "react";
import { DataBase } from "../../api";
import NodeView from "./NodeView";

interface DatabaseViewProps {
    database: DataBase,
}
 
const DatabaseView: FunctionComponent<DatabaseViewProps> = ({database}) => {
    const [tables, setTables] = useState(database.tables);

    return <div>
        <NodeView expand={true} loading={false} onClick={() => {}} onExpand={()=>{}}>
        {database.name}
        </NodeView>
        <div>
            {
                tables?.map(t => {
                    return <TableView key={t.name} table={t} />
                })
            }
        </div>
    </div>
}
 
export default DatabaseView;