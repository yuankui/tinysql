import { Button, message, Modal } from 'antd'
import { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UpdateConnectionsCommand } from '../../commands/UpdateConnectionsCommand'
import { useApi } from '../../hooks'
import NewConnectionFormView from './NewConnectionFormView'

interface SiderActionViewProps {}

const SiderActionView: FunctionComponent<SiderActionViewProps> = () => {
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)

    const api = useApi()
    const dispatch = useDispatch()
    return (
        <div className="flex flex-row-reverse">
            <Button
                type="primary"
                onClick={(e) => {
                    setShowModal(true)
                }}
            >
                增加
            </Button>
            <Modal
                title="新增连接"
                visible={showModal}
                onCancel={hideModal}
                onOk={hideModal}
            >
                <NewConnectionFormView
                    onSubmit={async (data) => {
                        try {
                            await api.createConnection(
                                data.title,
                                data.type,
                                JSON.stringify(data.config)
                            )
                            dispatch(new UpdateConnectionsCommand())
                            hideModal()
                        } catch (e: unknown) {
                            if (typeof e === 'string') {
                                message.error(e)
                            } else if (e instanceof Error) {
                                message.error(e.message)
                            } else {
                                message.error('unknowen error')
                                console.error(e)
                            }
                        }
                    }}
                />
            </Modal>
        </div>
    )
}

export default SiderActionView
