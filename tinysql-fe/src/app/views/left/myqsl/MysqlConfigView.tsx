import { Form, Input } from 'antd'
import { FunctionComponent } from 'react'

interface MysqlConfigViewProps {
}

const MysqlConfigView: FunctionComponent<MysqlConfigViewProps> = () => {
    return (
        <>
            <Form.Item
                name={['config', 'host']}
                rules={[
                    {
                        required: true,
                        message: '不能为空',
                    },
                ]}
                label="IP"
            >
                <Input />
            </Form.Item>
            <Form.Item name={['config', 'port']} label="端口">
                <Input />
            </Form.Item>
            <Form.Item name={['config', 'user']} label="用户名">
                <Input />
            </Form.Item>
            <Form.Item name={['config', 'pass']} label="密码">
                <Input type="password" />
            </Form.Item>
        </>
    )
}

export default MysqlConfigView
