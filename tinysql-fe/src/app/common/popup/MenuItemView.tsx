import { Popconfirm } from 'antd'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { Action } from '.'

interface Props {
    action: Action
}

const MenuItemView: FunctionComponent<Props> = ({ action }) => {
    const menuClass = classNames(
        'flex',
        'flex-row',
        'justify-between',
        'px-2 py-1',
        'cursor-pointer',
        'hover:bg-gray-600',
        'flex-1'
    )

    const content = (
        <div
            className={menuClass}
            onClick={action.confirmMessage ? undefined : action.onClick}
        >
            <span>{action.icon}</span>
            <span className="flex-1">{action.title}</span>
        </div>
    )

    if (action.confirmMessage == null) {
        return content
    }

    return (
        <Popconfirm
            title={action.confirmMessage}
            onConfirm={action.onClick}
            okText="Yes"
            cancelText="No"
        >
            {content}
        </Popconfirm>
    )
}

export default MenuItemView
