import { Button, Form, Input, Select } from 'antd'
import { FunctionComponent } from 'react'
import MysqlConfigView from './myqsl/MysqlConfigView'

interface Connection {
    type: string
    config: string
    title: string
}

interface NewConnectionFormViewProps {
    onSubmit: (data: Connection) => any,
}

const NewConnectionFormView: FunctionComponent<NewConnectionFormViewProps> =
    (props) => {
        return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={props.onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="链接名称"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: '不能为空',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="链接类型"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: '不能为空',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option disabled={true} value="no-other">暂不支持其他数据源</Select.Option>
                        <Select.Option value="mysql">MySQL</Select.Option>
                    </Select>
                </Form.Item>

                {/* TODO 这里写死，后续可以通过type字段，动态切换 */}
                <MysqlConfigView />


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }

export default NewConnectionFormView
