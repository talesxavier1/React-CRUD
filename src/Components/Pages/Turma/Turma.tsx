import { useNavigate } from 'react-router-dom';
import style from './Turma.module.css'

const Turma = () => {
    const navigate = useNavigate();

    return (
        <div className={style['content-container']}>
            <div className={style['buttons-grid-container']}>
                <button onClick={() => navigate("/main/turma/page")}>ADCIONAR</button>
            </div>
            <div className={style['grid-container']}>
                <p>GRID Turma</p>
            </div>
        </div >
    );
}

export default Turma;