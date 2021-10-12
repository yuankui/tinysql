import { Button } from "antd";
import { FunctionComponent } from "react";

interface SiderActionViewProps {
    
}
 
const SiderActionView: FunctionComponent<SiderActionViewProps> = () => {
    return <div className='flex flex-row-reverse'>
        <Button type='primary'>增加</Button>
    </div>
}
 
export default SiderActionView;