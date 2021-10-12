
import { EllipsisOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import Button from './Button'
import MenuView, { Menu } from './popup/MenuView'

interface Props {
}

const MoreButton: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch()

    const actions: Array<Menu> = [
        {
            title: 'New',
            onClick: async () => {
                
            },
        },
        {
            title: 'Delete',
            onClick: () => {
                
            },
        },
    ]
    const menu = <MenuView menus={actions} />

    return (
        <Tooltip title={menu} placement="rightTop" trigger="click">
            <Button className={'opacity-0 hover:opacity-100'}>
                <EllipsisOutlined />
            </Button>
        </Tooltip>
    )
}

export default MoreButton
