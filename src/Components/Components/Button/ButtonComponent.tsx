import './ButtonComponent.css';
import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';

interface propsInput {
    type?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    size?: "small" | "medium" | "large" | undefined
    variant?: "text" | "outlined" | "contained" | undefined
    style?: React.CSSProperties
    value: string
    onClick?: MouseEventHandler | undefined;
    id?: string
    disabled?: boolean
}

const ButtonComponent = (props: propsInput) => {

    return (
        <div className='a7c6e182' id={props.id ? props.id : ""}>
            <Button
                style={props.style}
                color={props.type ? props.type : undefined}
                size={props.size ? props.size : undefined}
                variant={props.variant ? props.variant : undefined}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.value}
            </Button>
        </div>
    );
}

export default ButtonComponent;