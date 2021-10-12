import { FunctionComponent } from "react";
import { useSelector } from "../../hooks";

interface CollectionListViewProps {
    
}
 
const CollectionListView: FunctionComponent<CollectionListViewProps> = () => {
    const connections = useSelector(state => state.connections) || [];
    
    return <div className='flex-1 bg-purple-300 flex flex-col justify-start'>
    {
        connections.map(c => {
            return  <div key={c.id} className='bg-gray-400 h-52 m-4'>
                {c.title}
            </div>
        })
    }
</div>
}
 
export default CollectionListView;