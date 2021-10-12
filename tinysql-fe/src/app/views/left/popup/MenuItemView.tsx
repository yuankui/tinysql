import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { Menu } from "./MenuView";

interface Props {
    menu: Menu,
    onClick: () => any,
}

const MenuItemView: FunctionComponent<Props> = (props) => {
    const menuClass = classNames(
        'flex',
        'flex-row',
        'justify-between',
        'px-2 py-1',
        'cursor-pointer',
        'hover:bg-gray-600',
    )
    return <div className={menuClass} onClick={props.onClick}>
        <div>{props.menu.title}</div>
    </div>;
};

export default MenuItemView;
