import { TextField } from '@mui/material';
import { createRef, RefObject, useContext, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/Auth';
import AlertCustomComponent from '../../Components/Alert/Alert';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import style from './Login.module.css'






const Login = () => {
    const authContext = useContext(AuthContext);
    const emailImputRef = createRef<HTMLInputElement>();
    const passwordImputRef = createRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);


    const loginButtonHandler = async () => {
        setShowLoginAlert(false);
        let email = emailImputRef.current?.value;
        let password = passwordImputRef.current?.value;
        if (email && password) {
            let loginStatus: boolean | undefined = await authContext?.login(email, password);
            if (loginStatus) {
                navigate('/main');
            }
            if (!loginStatus) {
                setShowLoginAlert(true);
            }
        }
    }
    //style[`alert ${showLoginAlert ? "alert-show" : ""}`]
    return (
        <div className={style['container']}>
            <div className={`${style.alert}${showLoginAlert ? ` ${style.alert_show}` : ""}`} >
                <AlertCustomComponent message='Usuário não encontrado' alertColor='error' />
            </div>
            <div className={style['login-container']}>
                <div className={style['components-container']}>
                    <TextField name='email' label="Email" style={{ margin: "20px" }} inputRef={emailImputRef} type="email" />
                    <TextField name='senha' label="Senha" style={{ margin: "20px" }} inputRef={passwordImputRef} type="password" />
                    <ButtonComponent value='Entrar' variant='text' style={{ color: '#222834', marginLeft: "400px", fontSize: "15px" }} onClick={async () => { await loginButtonHandler() }} />
                </div>
            </div>
        </div >
    );
}

export default Login;