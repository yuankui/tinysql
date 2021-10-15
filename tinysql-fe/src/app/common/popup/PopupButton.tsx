import { Tooltip } from "antd";
import { FunctionComponent, ReactNode } from "react";
import { Action } from ".";
import Button from "../../views/left/Button";
import MenuView from "./MenuView";

interface PopupButtonProps {
    actions: Action[],
}
 
const PopupButton: FunctionComponent<PopupButtonProps> = ({children, actions}) => {
    
    const menu = <MenuView actions={actions} />

    return (
        <Tooltip title={menu} placement="rightTop" trigger="click">
            <Button className='flex flex-row items-center gap-2 bg-gray-200'>
                {children}
            </Button>
        </Tooltip>
    )
}
 
export default PopupButton;