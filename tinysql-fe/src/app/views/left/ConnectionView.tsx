import { FunctionComponent } from "react";
import { Connection } from "../../api";
import NodeView from "./NodeView";

interface ConnectionViewProps {
    connection: Connection,
}
 
const ConnectionView: FunctionComponent<ConnectionViewProps> = ({connection}) => {
    return <div className='bg-gray-400 h-52 m-4'>
        <NodeView expand={true} loading={false} onClick={() => {}} onExpand={()=>{}} onLoading={() => {}}>
            {connection.title}
        </NodeView>
    </div>
}
 
export default ConnectionView;