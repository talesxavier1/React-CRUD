import { useNavigate } from 'react-router-dom';
import style from './Disciplina.module.css'

const Disciplina = () => {
    const navigate = useNavigate();

    return (
        <div className={style['content-container']}>
            <div className={style['filtro-container']}>
                <p>FILTROS DISCIPLINA</p>
            </div>
            <div className={style['buttons-grid-container']}>
                <button onClick={() => navigate("/main/disciplina/page")}>ADCIONAR</button>
            </div>
            <div className={style['grid-container']}>
                <p>GRID DISCIPLINA</p>
            </div>
        </div>
    );
}

export default Disciplina;