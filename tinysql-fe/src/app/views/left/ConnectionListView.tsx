import { FunctionComponent } from 'react'
import { useSelector } from '../../hooks'
import ConnectionView from './ConnectionView'

interface CollectionListViewProps {}

const ConnectionListView: FunctionComponent<CollectionListViewProps> = () => {
    const connections = useSelector((state) => state.connections) || []

    return (
        <div className="flex-1 flex flex-col justify-start shadow-inner">
            {connections.map((c) => {
                return <ConnectionView key={c.id} connection={c} />
            })}
        </div>
    )
}

export default ConnectionListView
