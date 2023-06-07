import { useNavigate } from 'react-router-dom';
import style from './Professor.module.css'
import ButtonComponent from '../../Components/Button/ButtonComponent';

const Professor = () => {
    const navigate = useNavigate();

    return (
        <div className={style['content-container']}>
            <div className={style['buttons-container']}>
                <><ButtonComponent value='Adicionar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#539553'
                    }}
                    onClick={() => navigate("/main/professor/page")}
                />
                </>
                <><ButtonComponent value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        /*backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`*/
                    }}
                /*onClick={() => { navigate(`/main/pessoa/page?codigo=${selectedRows[0]}`) }}*/
                /*disabled={selectedRows.length != 1}*/
                />
                </>
                <><ButtonComponent value='Excluir'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        /*backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`*/
                    }}
                /*disabled={selectedRows.length == 0}*/
                /*onClick={() => { deletePessoa() }}*/
                />
                </>
            </div>
            <div className={style['grid-container']}>
                <p>GRID CURSO</p>
            </div>
        </div>
    );
}

export default Professor;