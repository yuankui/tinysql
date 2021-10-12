import classNames from 'classnames'
import { FunctionComponent } from 'react'
import ExpandIcon from './ExpandIcon'
import MoreButton from './MoreButton'


interface Props {
    expand: boolean,
    onExpand: () => any,
    loading: boolean,
    onClick: () => any,
}

const NodeView: FunctionComponent<Props> = (props) => {
    const rowCenter = classNames(
        'flex-1',
        'inline-flex',
        'flex-row',
        'items-center',
        'overflow-hidden',
        'justify-start',
    )

    const nodeClass = classNames(
        'cursor-pointer',
        'flex', 
        'flex-shrink-0',
        'transition-all',
        'duration-200',
        'ease-in-out',
        'overflow-hidden',
        'items-center',
        'justify-between',
        'py-1',
        'px-0.5',
        'bg-transparent',
        'hover:bg-gray-500',
        'active:bg-gray-200',
    )
    return <div
        className={nodeClass}
    >
        <span
            className={rowCenter}
            onClick={async (e) => {
                
            }}
        >
            <ExpandIcon
                loading={props.loading}
                expand={props.expand}
                onChange={async () => {
                    props.onExpand()
                }}
            />
            <div className='px-1 py-0 truncate'>{props.children}</div>
        </span>

        <MoreButton />
    </div>
}

export default NodeView
