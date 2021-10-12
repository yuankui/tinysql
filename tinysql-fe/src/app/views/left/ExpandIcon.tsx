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
        <span className="transition-all duration-200 inline-flex items-center justify-center w-4 h-4"
        style={{ transform: rotate }}>
            <CaretRightOutlined />
        </span>
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
