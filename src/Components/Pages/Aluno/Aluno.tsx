import { useNavigate } from 'react-router-dom';
import style from './Aluno.module.css'

const Aluno = () => {
    const navigate = useNavigate();

    return (
        <div className={style['content-container']}>
            <div className={style['filtro-container']}>
                <p>FILTROS ALUNO</p>
            </div>
            <div className={style['buttons-grid-container']}>
                <button onClick={() => navigate("/main/aluno/page")}>ADCIONAR</button>
            </div>
            <div className={style['grid-container']}>
                <p>GRID ALUNO</p>
            </div>
        </div>
    );
}

export default Aluno;