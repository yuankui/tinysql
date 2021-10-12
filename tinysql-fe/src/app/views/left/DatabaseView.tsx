import { FunctionComponent } from "react";
import { DataBase } from "../../api";
import NodeView from "./NodeView";

interface DatabaseViewProps {
    database: DataBase,
}
 
const DatabaseView: FunctionComponent<DatabaseViewProps> = ({database}) => {
    return <NodeView expand={true} loading={false} onClick={() => {}} onExpand={()=>{}}>
        {database.name}
    </NodeView>
}
 
export default DatabaseView;