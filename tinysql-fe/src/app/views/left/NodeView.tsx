import classNames from 'classnames'
import { FunctionComponent, ReactNode } from 'react'
import ExpandIcon from './ExpandIcon'



interface Props {
    expand: boolean,
    onExpand: () => any,
    loading: boolean,
    onClick: () => any,
    className ?: string,
    trailing ?: ReactNode,
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
        'px-1',
        'bg-transparent',
        'hover:bg-gray-200',
        'active:bg-gray-300',
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
            <div className={'px-1 py-0 truncate' + " " + (props.className || "")}>{props.children}</div>
        </span>

        {props.trailing}
    </div>
}

export default NodeView
