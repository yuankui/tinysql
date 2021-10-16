import { Tooltip } from 'antd'
import { FunctionComponent, ReactNode, useState } from 'react'
import { Action } from '.'
import Button from '../../views/left/Button'
import MenuView from './MenuView'

interface PopupButtonProps {
    actions: Action[]
}

const PopupButton: FunctionComponent<PopupButtonProps> = ({
    children,
    actions,
}) => {
    const [visible, setVisible] = useState(false)

    const menu = (
        <MenuView
            onActionDone={() => {
                setVisible(false)
            }}
            actions={actions}
        />
    )
    return (
        <Tooltip
            title={menu}
            placement="rightTop"
            visible={visible}
            trigger="click"
            onVisibleChange={(v) => {
                setVisible(v)
            }}
        >
            <Button className="flex flex-row items-center gap-2 bg-gray-200">
                {children}
            </Button>
        </Tooltip>
    )
}

export default PopupButton
