import { Form, Input, InputNumber } from 'antd'
import { FunctionComponent } from 'react'

interface MysqlConfigViewProps {}

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
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: '不能为空',
                    },
                    
                ]}
                name={['config', 'port']}
                label="端口"
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: '不能为空',
                    },
                ]}
                name={['config', 'user']}
                label="用户名"
            >
                <Input />
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: '不能为空',
                    },
                ]}
                name={['config', 'pass']}
                label="密码"
            >
                <Input type="password" />
            </Form.Item>
        </>
    )
}

export default MysqlConfigView
