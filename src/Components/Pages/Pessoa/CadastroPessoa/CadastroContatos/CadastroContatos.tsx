import style from './CadastroContatos.module.css'
import ButtonComponent from '../../../../Components/Button/ButtonComponent';
import ModalComponent from '../../../../Components/Modal/ModalComponent';
import { useContext, useEffect, useRef, useState } from 'react';
import TextFieldComponent from '../../../../Components/TextField/TextFieldComponent';
import Grid from '../../../../Components/Grid/Grid';
import { GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { mask } from "../../../../../utils/mask"
import { IContatoModel } from '../../../../../Models/Interfaces/IContatoModel';
import { PessoaContext } from '../../PessoaContext';
import { useQuery } from 'react-query';
import { ContatoModel } from '../../../../../Models/Objects/ContatoModel';
import { GUID } from '../../../../../utils/GUID';
import RefFormatter from '../../../../../utils/RefFormatter';
import Swal from 'sweetalert2';

const CadastroContatos = () => {
    const [modalContatos, setModalContatos] = useState<{ modalAberto: boolean, conteudoModal?: IContatoModel }>({ modalAberto: false });
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const pessoaContext = useContext(PessoaContext);

    const callBackModalContatos = () => {
        if (modalContatos.modalAberto) {
            setModalContatos({
                modalAberto: false,
                conteudoModal: undefined
            });
        } else {
            setModalContatos({
                modalAberto: true
            });
        }
    };

    const { isFetching: contatosIsFatching, refetch: refetchContatos } = useQuery(
        ["contatos", pessoaContext?.pessoa.codigo, gridPage],
        async () => {
            if (pessoaContext?.pessoa && pessoaContext.pessoa.codigo) {
                let result = await pessoaContext.buscarContatos(pessoaContext.pessoa.codigo, gridPage * 5, 5);
                pessoaContext.setContatos(result);
            }
        },
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const { data: countContatos, refetch: refetchCountcontatos } = useQuery(
        ["countcontatos", pessoaContext?.pessoa.codigo],
        async () => {
            if (!pessoaContext || !pessoaContext.pessoa.codigo) { return 0 }
            let result = await pessoaContext.countContatos(pessoaContext.pessoa.codigo);
            return result ?? 0
        },
        { refetchOnWindowFocus: false }
    );

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'nomeContato', headerName: 'Nome Contato', width: 300, sortable: false },
        { field: 'email', headerName: 'Email', width: 300, sortable: false },
        { field: 'telefoneCelular', headerName: 'Telefone Celular', width: 150, sortable: false, valueFormatter: (VALUE) => new mask({ mask: '(##) #####-####', type: 'number', value: VALUE.value }).applyMask() },
        { field: 'telefoneFixo', headerName: 'Telefone Fixo', width: 150, sortable: false, valueFormatter: (VALUE) => new mask({ mask: '(##) ####-####', type: 'number', value: VALUE.value }).applyMask() }
    ];

    let refsMap = RefFormatter.generateObjectRefs(new ContatoModel, ["codigoRef"]);

    const saveContato = async () => {
        if (!pessoaContext) { return };
        let contato = RefFormatter.getObjectFromRefs(new ContatoModel, refsMap) as ContatoModel;
        contato.codigoRef = pessoaContext?.pessoa.codigo ?? "";
        contato.telefoneCelular = contato?.telefoneCelular ? contato.telefoneCelular.replace(/[^0-9]/g, '') : "";
        contato.telefoneFixo = contato?.telefoneFixo ? contato.telefoneFixo.replace(/[^0-9]/g, '') : "";

        let result;
        if (pessoaContext.contatos.find((VALUE: ContatoModel) => { return VALUE.codigo == contato.codigo })) {
            result = await pessoaContext.atualizarContato(contato);
        } else {
            result = await pessoaContext.addContato(contato);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalContatos({ modalAberto: false });
                refetchContatos();
                refetchCountcontatos();
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }
    };

    const deleteContato = async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await pessoaContext?.deleteContato(VALUE.toString());
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
            refetchContatos();
            refetchCountcontatos();
        });
    }

    return (
        <>
            <ModalComponent
                btnSaveAction={saveContato}
                modalAberto={modalContatos.modalAberto}
                closeOpenModal={callBackModalContatos}
                content={<CadastroContatosContent refsMap={refsMap} value={modalContatos.conteudoModal} />}
            />
            <div className={style['buttons_area']}>
                <ButtonComponent value='Adicionar' variant='outlined' style={{ color: '#222834', backgroundColor: '#539553' }} onClick={() => { callBackModalContatos() }} />
                <ButtonComponent
                    value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { setModalContatos({ modalAberto: true, conteudoModal: pessoaContext?.contatos.find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
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
                    onClick={() => { deleteContato() }}
                />
            </div>
            <div className={style['grid_container']}>
                <Grid
                    loading={contatosIsFatching}
                    linhasGrid={pessoaContext?.contatos ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={countContatos}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </>
    );
}

const CadastroContatosContent = (props: { value?: IContatoModel, refsMap: Map<string, React.MutableRefObject<any>> }) => {
    return (
        <div className={style['fields-container']}>
            <TextFieldComponent readonly inputRef={props.refsMap.get("codigo")} id={style["codigo"]} value={props.value?.codigo ?? GUID.getGUID()} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent inputRef={props.refsMap.get("nomeContato")} id={style["nomeContato"]} value={props.value?.nomeContato ?? ""} sx={{ width: "100%" }} label='Nome Contato' />
            <TextFieldComponent inputRef={props.refsMap.get("email")} id={style["email"]} value={props.value?.email ?? ""} sx={{ width: "100%" }} label='Email' />
            <TextFieldComponent inputRef={props.refsMap.get("telefoneCelular")} id={style["telefoneCelular"]} value={props.value?.telefoneCelular ?? ""} sx={{ width: "100%" }} label='Telefone Celular' mask='(##) #####-####' />
            <TextFieldComponent inputRef={props.refsMap.get("telefoneFixo")} id={style["telefoneFixo"]} value={props.value?.telefoneFixo ?? ""} sx={{ width: "100%" }} label='Telefone Fixo' mask='(##) ####-####' />
        </div>
    );
}

export default CadastroContatos;