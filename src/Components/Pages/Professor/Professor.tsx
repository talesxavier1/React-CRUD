import { useNavigate } from 'react-router-dom';
import style from './Professor.module.css'

const Professor = () => {
    const navigate = useNavigate();

    return (
        <div className={style['content-container']}>
            <div className={style['filtro-container']}>
                <p>FILTROS CURSO</p>
            </div>
            <div className={style['buttons-grid-container']}>
                <button onClick={() => navigate("/main/professor/page")}>ADCIONAR</button>
            </div>
            <div className={style['grid-container']}>
                <p>GRID CURSO</p>
            </div>
        </div>
    );
}

export default Professor;