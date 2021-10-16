import classNames from 'classnames';
import {FunctionComponent, ReactNode} from 'react';
import { Action } from '.';
import MenuItemView from "./MenuItemView";

interface Props {
    actions: Action[],
    onActionDone: () => any,
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
            props.actions.map((action, i) => {
                return <MenuItemView onActionDone={props.onActionDone} key={i} action={action}/>
            })
        }
    </div>;
};

export default MenuView;
