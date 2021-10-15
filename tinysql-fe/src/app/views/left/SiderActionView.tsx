import { Button, Modal } from "antd";
import { FunctionComponent, useState } from "react";
import NewConnectionFormView from "./NewConnectionFormView";

interface SiderActionViewProps {
    
}
 
const SiderActionView: FunctionComponent<SiderActionViewProps> = () => {
    const [showModal, setShowModal] = useState(false);
    const hideModal = () => setShowModal(false);
    return <div className='flex flex-row-reverse'>
        <Button type='primary' onClick={e => {
            setShowModal(true)
        }}>增加</Button>
        <Modal title="新增连接" visible={showModal} onCancel={hideModal} onOk={hideModal}>
            <NewConnectionFormView onSubmit={console.log}/>
        </Modal>
    </div>
}
 
export default SiderActionView;