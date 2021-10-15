import classNames from 'classnames';
import {FunctionComponent} from 'react';

interface Props {
    onClick ?: (e: any) => void,
    className?: string,
}

const Button: FunctionComponent<Props> = (props) => {
    const className = classNames(
        'inline-flex',
        'flex-row',
        'rounded-sm',
        'p-1',
        'flex-shrink-0',
        'items-center',
        'justify-center',
        'hover:bg-gray-400',
        (props.className || ""),
    )
    return <button className={className} onClick={(e) => {
        props.onClick && props.onClick(e);
        e.stopPropagation();
    }}>
        {props.children}
    </button>;
};

export default Button;
