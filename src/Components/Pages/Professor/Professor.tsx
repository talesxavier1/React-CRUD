import { useNavigate } from 'react-router-dom';
import style from './Professor.module.css'
import ButtonComponent from '../../Components/Button/ButtonComponent';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useCallback, useContext, useMemo, useState } from 'react';
import Grid from '../../Components/Grid/Grid';
import { mask } from '../../../utils/mask';
import TryParse from '../../../utils/TryParse';
import DateFormat from '../../../utils/DateFormat';
import { ProfessorContext } from './ProfessorContext';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const Professor = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const professorContext = useContext(ProfessorContext);

    const { data: professores, isFetching: professoresIsFetching, refetch: professoresRefetch } = useQuery(
        ["professores", gridPage],
        (async () => {
            let result = await professorContext?.getProfessores(gridPage * 5, 5);
            if (result) { return result; }
            return [];
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const { data: professoresCount, refetch: professoresCountRefetch } = useQuery(
        ["professoresCount"],
        (async () => {
            let result = await professorContext?.conutProfessores();
            return result ?? 0;
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const propriedadesColunas: GridColDef[] = useMemo((): GridColDef[] => {
        return [
            { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
            {
                field: 'pessoa',
                headerName: 'Pessoa',
                width: (() => {
                    let mapLength = professores?.map(VALUE => VALUE.pessoa.length) ?? [];
                    return mapLength.length > 0 ? mapLength.sort((a, b) => b - a)[0] * 8 : 250;
                })(),
                sortable: false,
                editable: true
            },
            {
                field: 'pessoaCPF',
                headerName: 'CPF',
                width: 150, sortable: false,
                valueFormatter: (VALUE) => {
                    if (!VALUE) { return "" }
                    return new mask({ mask: '###.###.###-##', type: 'number', value: VALUE.value }).applyMask()
                }
            },
            { field: 'funcao', headerName: 'Função', width: 200, sortable: false },
            { field: 'cargaHoraria', headerName: 'Carga Horária', width: 150, sortable: false },
            {
                field: 'formacaoAcademica',
                headerName: 'Formação Acadêmica',
                width: (() => {
                    let mapLength = professores?.map(VALUE => VALUE.formacaoAcademica.length) ?? [];
                    return mapLength.length > 0 ? mapLength.sort((a, b) => b - a)[0] * 8 : 250;
                })(),
                sortable: false,
                valueFormatter: (VALUE) => {
                    let parseValue = TryParse(VALUE.value);
                    return Array.isArray(parseValue) ? parseValue.join(",") : parseValue;
                }
            },
            {
                field: 'dataInicioContratacao',
                headerName: 'Início da Contratação',
                width: 200,
                sortable: false,
                valueFormatter: (VALUE) => {
                    return DateFormat.formatDate({ "isoDate": VALUE.value, "format": "DD/MM/YYYY" });
                }
            },
            {
                field: 'nivelEnsinoQueMinistra',
                headerName: 'Nível de Ensino que Ministra',
                width: (() => {
                    let mapLength = professores?.map(VALUE => VALUE.nivelEnsinoQueMinistra.length) ?? [];
                    return mapLength.length > 0 ? mapLength.sort((a, b) => b - a)[0] * 8 : 250;
                })(),
                sortable: false,
                valueFormatter: (VALUE) => {
                    let parseValue = TryParse(VALUE.value);
                    return Array.isArray(parseValue) ? parseValue.join(",") : parseValue;
                }
            },
            { field: 'tipoContrato', headerName: 'Tipo de Contrato', width: 170, sortable: false },
            {
                field: 'areaAtuacao',
                headerName: 'Área de Atuação',
                width: (() => {
                    let mapLength = professores?.map(VALUE => VALUE.areaAtuacao.length) ?? [];
                    return mapLength.length > 0 ? mapLength.sort((a, b) => b - a)[0] * 8 : 250;
                })(),
                sortable: false,
                valueFormatter: (VALUE) => {
                    let parseValue = TryParse(VALUE.value);
                    return Array.isArray(parseValue) ? parseValue.join(",") : parseValue;
                }
            },
            { field: 'valorHoraAula', headerName: 'Valor Hora Aula', width: 150, sortable: false }
        ];
    }, [professores])

    const deleteProfessor = useCallback(async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await professorContext?.deleteProfessor(VALUE.toString())
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
            professoresRefetch();
            professoresCountRefetch();
        });

    }, [selectedRows]);

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
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { navigate(`/main/professor/page?codigo=${selectedRows[0]}`) }}
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
                    onClick={() => { deleteProfessor() }}
                />
                </>
            </div>
            <div className={style['grid-container']}>
                <Grid
                    loading={professoresIsFetching}
                    linhasGrid={professores ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={professoresCount}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </div>
    );
}

export default Professor;