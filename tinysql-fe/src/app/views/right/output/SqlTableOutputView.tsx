import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FunctionComponent } from 'react'
import { TableResult } from '../../../api'

interface SqlTableOutputViewProps {
    data?: TableResult
    onNext(): any
    onPrev(): any
    page: number
}

const SqlTableOutputView: FunctionComponent<SqlTableOutputViewProps> = ({
    data,
    page,
    onNext,
    onPrev,
}) => {
    if (data === undefined) {
        return <div>EMPTY</div>
    }

    const disablePrev = page <= 0
    const disableNext = data.data.length === 0

    return (
        <div className="flex-1 overflow-auto mt-4">
            <table>
                <thead className="bg-gray-200">
                    <tr className="">
                        {(data || {}).fields.map((d, i) => {
                            return <td key={i}>{d}</td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {(data || {}).data.map((row, i) => {
                        return (
                            <tr key={i} className='hover:bg-gray-100'>
                                {row.map((cell, j) => {
                                    return <td key={j}>{cell}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex flex-row justify-start">
                <div className="flex flex-row p-4 gap-2">
                    <Button
                        disabled={disablePrev}
                        size="small"
                        onClick={(e) => {
                            onPrev()
                        }}
                    >
                        <LeftOutlined />
                        上一页
                    </Button>
                    <Button size="small">{page}</Button>
                    <Button
                        disabled={disableNext}
                        size="small"
                        onClick={(e) => {
                            onNext()
                        }}
                    >
                        下一页
                        <RightOutlined />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SqlTableOutputView
