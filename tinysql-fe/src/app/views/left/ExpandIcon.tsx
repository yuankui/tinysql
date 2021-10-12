import { FunctionComponent } from 'react'
import Button from './Button'
import { CaretRightOutlined, LoadingOutlined } from '@ant-design/icons'
import { OnChange } from '../../common'

interface Props {
    expand?: boolean
    loading?: boolean
    onChange?: OnChange<boolean>
}

const ExpandIcon: FunctionComponent<Props> = (props) => {
    const { expand, loading, onChange: setExpand } = props

    const rotate = expand ? 'rotate(90deg)' : 'rotate(0deg)'

    // tslint:disable-next-line: no-extra-boolean-cast
    const icon = !!loading ? (
        <LoadingOutlined />
    ) : (
        <CaretRightOutlined className='transition-all duration-200' style={{width: 15,
            height: 15,
            transform: rotate,}} />
    )

    return (
        <Button
            className="w-5 h-5"
            onClick={(e) => {
                setExpand && setExpand(!expand)
            }}
        >
            {icon}
        </Button>
    )
}

export default ExpandIcon
