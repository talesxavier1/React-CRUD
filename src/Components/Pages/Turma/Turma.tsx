import { useNavigate } from 'react-router-dom';
import style from './Turma.module.css'
import { useTurmaContext } from './TurmaContext';
import { useState } from 'react';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import Grid from '../../Components/Grid/Grid';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const propriedadesColunas: GridColDef[] = [
    { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
    { field: 'classCode', headerName: 'Código da Turma', width: 200, sortable: false },
    { field: 'schoolYear', headerName: 'Ano Letivo', width: 150, sortable: false },
    { field: 'classStatus', headerName: 'Status da Turma', width: 170, sortable: false },
    { field: 'gradeLevel', headerName: 'Nível da Turma', width: 150, sortable: false },
    { field: 'classShift', headerName: 'Turno', width: 150, sortable: false },
    { field: 'responsibleTeacher', headerName: 'Professor Responsável', width: 250, sortable: false },
    { field: 'classStartDate', headerName: 'Data de Iniício', width: 150, sortable: false },
    { field: 'classEndtDate', headerName: 'Data de Fim', width: 150, sortable: false },
    { field: 'totalWorkload', headerName: 'Carga Horária', width: 150, sortable: false },
    { field: 'supplementaryWorkload', headerName: 'Carga Horária Suplementar', width: 200, sortable: false },
];

const Turma = () => {
    const turmaContext = useTurmaContext();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);

    const { isFetching, refetch } = useQuery(
        ["turma_query", gridPage],
        (async () => {
            let values = await turmaContext.getTurmaList(gridPage * 5, 5);
            let count = await turmaContext.countTurma();
            turmaContext.setTurmas(values, count);
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const deleTurma = async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await turmaContext.deleteTurma(VALUE.toString())
            results.push({ "result": result, "id": VALUE.toString() });
        }

        Swal.fire({
            icon: 'success',
            html: (() => {
                let result = [];

                let comSucesso = results.filter(VALUE => VALUE.result);
                if (comSucesso.length > 0) {
                    result.push("Registros apagados:");
                    result.push(comSucesso.map(VALUE => `   ${VALUE.id}<br/>`).join(""));
                }

                let semSucesso = results.filter(VALUE => !VALUE.result);
                if (semSucesso.length > 0) {
                    result.push("Registros não apagados:");
                    result.push(semSucesso.map(VALUE => `   ${VALUE.id}<br/>`).join(""));
                }

                return result.join("<br/>")
            })(),
        }).then(() => {
            refetch();
        });
    };

    return (

        <div className={style['content-container']}>
            <div className={style['buttons-container']}>
                <><ButtonComponent value='Adicionar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#539553'
                    }}
                    onClick={() => navigate("/main/turma/page")}
                />
                </>
                <><ButtonComponent value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { navigate(`/main/turma/page/${selectedRows[0]}`) }}
                    disabled={selectedRows.length != 1}
                />
                </>
                <><ButtonComponent value='Excluir'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`
                    }}
                    disabled={selectedRows.length == 0}
                    onClick={() => { deleTurma() }}
                />
                </>
            </div>
            <div className={style['grid-container']}>
                <Grid
                    loading={isFetching}
                    linhasGrid={turmaContext.turmas?.values ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={turmaContext.turmas?.count ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </div>
    );
}

export default Turma;