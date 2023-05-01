import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { mask } from '../../../utils/mask';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import Grid from '../../Components/Grid/Grid';
import style from './Pessoa.module.css'
import { PessoaContext } from './PessoaContext';
import Swal from 'sweetalert2';

const Pessoa = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const pessoaContext = useContext(PessoaContext);

    const { data: pessoas, isFetching: pessoasIsFetching, refetch: pessoasRefetch } = useQuery(
        ["pessoas", gridPage],
        (async () => {
            let result = await pessoaContext?.buscarPessoas(gridPage * 5, 5);
            if (result) { return result; }
            return [];
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const { data: pessoasCount } = useQuery(
        ["pessoasCount", gridPage],
        (async () => {
            let result = await pessoaContext?.countPessoas();
            return (result ?? 0) as number;
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const deletePessoa = async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await pessoaContext?.deletePessoa(VALUE.toString());
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
                    result.push("Registros não pagados:");
                    result.push(semSucesso.map(VALUE => `   ${VALUE.id}<br/>`).join(""));
                }

                return result.join("<br/>")
            })(),
        }).then(() => {
            pessoasRefetch();
        });

    }

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'nome', headerName: 'Nome', width: 300, sortable: false },
        {
            field: 'cpf',
            headerName: 'CPF',
            width: 150, sortable:
                false,
            valueFormatter: (VALUE) => {
                if (!VALUE) { return "" }
                return new mask({ mask: '###.###.###-##', type: 'number', value: VALUE.value }).applyMask()
            }
        },
        { field: 'rg', headerName: 'RG', width: 120, sortable: false },
        {
            field: 'dataNascimento',
            type: 'string',
            headerName: 'Data de Nascimento',
            width: 155,
            sortable: false,
            valueFormatter: (VALUE: any) => {
                if (!VALUE) { return "" }
                return new Date(VALUE.value).toLocaleDateString("pt-BR");
            }
        },
        { field: 'nacionalidadePais', headerName: 'Nacionalidade País', width: 145, sortable: false },
        { field: 'nacionalidadeEstado', headerName: 'Nacionalidade Estado', width: 165, sortable: false },
        { field: 'nacionalidadeMunicipio', headerName: 'Nacionalidade Município', width: 300, sortable: false },
        { field: 'sexo', headerName: 'Sexo', width: 105, sortable: false },
        { field: 'estadoCivil', headerName: 'Estado Civil', width: 105, sortable: false },
        { field: 'tituloEleitorNumero', headerName: 'Número Título de Eleitor', width: 180, sortable: false },
        { field: 'tituloEleitorZona', headerName: 'Zona Título de Eleitor', width: 160, sortable: false },
        { field: 'tituloEleitorEstado', headerName: 'Estado Título de Eleitor', width: 170, sortable: false },
        {
            field: 'tituloEleitorExpedicao',
            headerName: 'Expedição Título de Eleitor',
            width: 195,
            sortable: false,
            valueFormatter: (VALUE: any) => {
                if (!VALUE) { return "" }
                return new Date(VALUE.value).toLocaleDateString("pt-BR");
            }
        },
        { field: 'tituloEleitorSecao', headerName: 'Seção Título de Eleitor', width: 165, sortable: false },
        { field: 'nomePai', headerName: 'Nome do Pai', width: 300, sortable: false },
        { field: 'nomeMae', headerName: 'Nome da Mãe', width: 300, sortable: false }
    ];

    return (
        <div className={style['content-container']}>
            <div className={style['buttons-container']}>
                <ButtonComponent value='Adicionar' variant='outlined' style={{ color: '#222834', backgroundColor: '#539553' }} onClick={() => navigate("/main/pessoa/page")} />
                <ButtonComponent
                    value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { navigate(`/main/pessoa/page?codigo=${selectedRows[0]}`) }}
                    disabled={selectedRows.length != 1}
                />
                <ButtonComponent
                    value='Excluir'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`
                    }}
                    disabled={selectedRows.length == 0}
                    onClick={() => { deletePessoa() }}
                />
            </div>
            <div className={style['grid-container']}>
                <Grid
                    loading={pessoasIsFetching}
                    linhasGrid={pessoas ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={pessoasCount ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </div>
    );
}

export default Pessoa;