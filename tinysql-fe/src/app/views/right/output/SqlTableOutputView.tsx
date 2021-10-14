import { FunctionComponent } from 'react'
import { TableResult } from '../../../api'

interface SqlTableOutputViewProps {
    data?: TableResult
}

const SqlTableOutputView: FunctionComponent<SqlTableOutputViewProps> = ({
    data,
}) => {
    if (data === undefined) {
        return <div>EMPTY</div>
    }
    return (
        <div className="flex-1">
            <table>
                <thead className='bg-gray-200'>
                    <tr className=''>
                        {(data || {}).fields.map((d, i) => {
                            return <td key={i}>{d}</td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {(data || {}).data.map((row, i) => {
                        return (
                            <tr key={i}>
                                {row.map((cell, j) => {
                                    return <td key={j}>{cell}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SqlTableOutputView
