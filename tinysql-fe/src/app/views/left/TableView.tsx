import { FunctionComponent, useState } from "react";
import { Table } from "../../api";
import NodeView from "./NodeView";

interface TableViewProps {
    table: Table
}
 
const TableView: FunctionComponent<TableViewProps> = ({table}) => {
    const [fields, setFields] = useState(table.fields);

    return <div>
        <NodeView expand={false} loading={false} onClick={() => {}} onExpand={() => {}}>
            {table.name}
        </NodeView>
        <div className='pl-4'>
            {
                (fields || [])
                .map(f => {
                    return <div className='flex flex-row'>
                        <div>{f.name}</div>
                        <div>{f.type}</div>
                    </div>
                })
            }
        </div>
    </div>
}
 
export default TableView;