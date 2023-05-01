import { Alert } from '@mui/material';
import style from './Alert.module.css';

interface IPorps {
    id?: string;
    alertColor?: 'success' | 'info' | 'warning' | 'error';
    message: string
}

const AlertCustomComponent = (props: IPorps) => {
    return (
        <div id={props.id ?? props.id}>
            <Alert severity={props.alertColor ?? props.alertColor}>{props.message}</Alert>
        </div>
    )
}

export default AlertCustomComponent;

