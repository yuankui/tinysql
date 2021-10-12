import classNames from 'classnames';
import {FunctionComponent, ReactNode} from 'react';
import MenuItemView from "./MenuItemView";

interface Props {
    menus: Array<Menu>,
}

export interface Menu {
    title: ReactNode,
    onClick: () => any,
    disable ?: boolean,
}
const MenuView: FunctionComponent<Props> = (props) => {
    const menusClass = classNames(
        'flex',
        'flex-row',
        'items-center',
        'w-32',
        'select-none',
    )
    return <div className={menusClass}>
        {
            props.menus.map((menu, i) => {
                return <MenuItemView key={i} onClick={menu.onClick} menu={menu}/>
            })
        }
    </div>;
};

export default MenuView;
