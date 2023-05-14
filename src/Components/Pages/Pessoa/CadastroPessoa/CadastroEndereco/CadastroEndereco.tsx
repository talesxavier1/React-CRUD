import style from './CadastroEndereco.module.css'
import ButtonComponent from '../../../../Components/Button/ButtonComponent';
import ModalComponent from '../../../../Components/Modal/ModalComponent';
import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import TextFieldComponent from '../../../../Components/TextField/TextFieldComponent';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Grid from '../../../../Components/Grid/Grid';
import { mask } from '../../../../../utils/mask';
import { IEnderecoModel } from '../../../../../Models/Interfaces/IEnderecoModel';
import { PessoaContext } from '../../PessoaContext';
import { useQuery } from 'react-query';
import { GUID } from '../../../../../utils/GUID';
import { EnderecoModel } from '../../../../../Models/Objects/EnderecoModel';
import RefFormatter from '../../../../../utils/RefFormatter';
import Swal from 'sweetalert2';
import SelectComponent, { IOption } from '../../../../Components/Select/SelectComponent';
import LocalidadesRepository from '../../../../../Repository/Implementations/LocalidadesRepository';
import { EstadoModel, MunicipioModel } from '../../../../../Models/Objects/LocalidadesModels';


const CadastroEndereco = () => {
    const [modalAdicionar, setModalAdicionar] = useState<{ modalaberto: boolean, conteudoModal?: IEnderecoModel }>({ modalaberto: false });
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const pessoaContext = useContext(PessoaContext);

    const callBackcloseOpenModal = () => {
        if (modalAdicionar.modalaberto) {
            setModalAdicionar({
                modalaberto: false,
                conteudoModal: undefined
            });
        } else {
            setModalAdicionar({
                modalaberto: true
            });
        }
    };

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'cep', type: 'string', headerName: 'CEP', width: 300, sortable: false, valueFormatter: (VALUE) => new mask({ mask: '#####-###', type: 'number', value: VALUE.value }).applyMask() },
        { field: 'tipoEndereco', type: 'string', headerName: 'Tipo Endereco', width: 300, sortable: false },
        { field: 'rua', type: 'string', headerName: 'Rua', width: 300, sortable: false },
        { field: 'numero', type: 'string', headerName: 'Número', width: 300, sortable: false },
        { field: 'bairro', type: 'string', headerName: 'Bairro', width: 300, sortable: false },
        { field: 'cidade', type: 'string', headerName: 'Cidade', width: 300, sortable: false },
        { field: 'codigoIBGECidade', type: 'string', headerName: 'IBGE Cidade', width: 300, sortable: false },
        { field: 'estado', type: 'string', headerName: 'Estado', width: 300, sortable: false },
        { field: 'codigoIBGEEstado', type: 'string', headerName: 'IBGE Estado', width: 300, sortable: false },
    ];

    const { isFetching: enderecos_queryIsLoading, refetch: enderecos_refetch } = useQuery(
        ["buscarEnderecos", gridPage, (pessoaContext?.pessoa.codigo ?? "")],
        async () => {
            if (pessoaContext?.pessoa && pessoaContext.pessoa.codigo) {
                let result = await pessoaContext.buscarEnderecos(pessoaContext.pessoa.codigo, gridPage * 5, 5);
                pessoaContext.setEnderecos(result);
            }
        },
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const { data: countEnderecos_queryResult, refetch: countEnderecos_refetch } = useQuery(
        ["countEnderecos", (pessoaContext?.pessoa.codigo ?? "")],
        async () => {

            if (pessoaContext?.pessoa?.codigo) {
                return await pessoaContext?.countEnderecos(pessoaContext.pessoa.codigo);
            }
            return 0;
        },
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    let refsMap = RefFormatter.generateObjectRefs(new EnderecoModel(), ["codigoRef"]);

    const saveEndereco = async () => {
        let endereco: any = RefFormatter.getObjectFromRefs(new EnderecoModel(), refsMap);
        endereco.codigoRef = pessoaContext?.pessoa.codigo;
        endereco.telefoneCelular = endereco?.cep ? endereco.cep.replace(/[^0-9]/g, '') : "";

        let result;
        if (pessoaContext?.enderecos.find((VALUE: EnderecoModel) => VALUE.codigo == endereco.codigo)) {
            result = await pessoaContext.atualizarEndereco(endereco);
        } else {
            result = await pessoaContext?.addEndereco(endereco);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalAdicionar({ modalaberto: false });
                enderecos_refetch();
                countEnderecos_refetch();
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }
    };

    const deleteEndereco = async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await pessoaContext?.deleteEndereco(VALUE.toString());
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
            enderecos_refetch();
            countEnderecos_refetch();
        });
    }

    return (
        <>
            <ModalComponent
                modalAberto={modalAdicionar.modalaberto}
                closeOpenModal={callBackcloseOpenModal}
                content={<CadastroEnderecoContent value={modalAdicionar.conteudoModal} refsMap={refsMap} />}
                btnSaveAction={saveEndereco}
            />
            <div className={style['buttons_area']}>
                <ButtonComponent value='Adicionar' variant='outlined' style={{ color: '#222834', backgroundColor: '#539553' }} onClick={() => { callBackcloseOpenModal() }} />
                <ButtonComponent
                    value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { setModalAdicionar({ modalaberto: true, conteudoModal: (pessoaContext?.enderecos ?? []).find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
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
                    onClick={() => { deleteEndereco() }}
                />
            </div>
            <div className={style['grid_container']}>
                <Grid
                    loading={enderecos_queryIsLoading}
                    linhasGrid={pessoaContext?.enderecos ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={countEnderecos_queryResult ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </>
    );
}

const CadastroEnderecoContent = (props: { value?: IEnderecoModel, refsMap: Map<string, MutableRefObject<any>> }) => {
    let tipoenderecoOptions = [
        { "desc": "AEROPORTO", "id": "AEROPORTO" },
        { "desc": "ALAMEDA", "id": "ALAMEDA" },
        { "desc": "ÁREA", "id": "ÁREA" },
        { "desc": "AVENIDA", "id": "AVENIDA" },
        { "desc": "CAMPO", "id": "CAMPO" },
        { "desc": "CHÁCARA", "id": "CHÁCARA" },
        { "desc": "COLÔNIA", "id": "COLÔNIA" },
        { "desc": "CONDOMÍNIO", "id": "CONDOMÍNIO" },
        { "desc": "CONJUNTO", "id": "CONJUNTO" },
        { "desc": "DISTRITO", "id": "DISTRITO" },
        { "desc": "ESPLANADA", "id": "ESPLANADA" },
        { "desc": "ESTAÇÃO", "id": "ESTAÇÃO" },
        { "desc": "ESTRADA", "id": "ESTRADA" },
        { "desc": "FAVELA", "id": "FAVELA" },
        { "desc": "FAZENDA", "id": "FAZENDA" },
        { "desc": "FEIRA", "id": "FEIRA" },
        { "desc": "JARDIM", "id": "JARDIM" },
        { "desc": "LADEIRA", "id": "LADEIRA" },
        { "desc": "LAGO", "id": "LAGO" },
        { "desc": "LAGOA", "id": "LAGOA" },
        { "desc": "LARGO", "id": "LARGO" },
        { "desc": "LOTEAMENTO", "id": "LOTEAMENTO" },
        { "desc": "MORRO", "id": "MORRO" },
        { "desc": "NÚCLEO", "id": "NÚCLEO" },
        { "desc": "PARQUE", "id": "PARQUE" },
        { "desc": "PASSARELA", "id": "PASSARELA" },
        { "desc": "PÁTIO", "id": "PÁTIO" },
        { "desc": "PRAÇA", "id": "PRAÇA" },
        { "desc": "QUADRA", "id": "QUADRA" },
        { "desc": "RECANTO", "id": "RECANTO" },
        { "desc": "RESIDENCIAL", "id": "RESIDENCIAL" },
        { "desc": "RODOVIA", "id": "RODOVIA" },
        { "desc": "RUA", "id": "RUA" },
        { "desc": "SETOR", "id": "SETOR" },
        { "desc": "SÍTIO", "id": "SÍTIO" },
        { "desc": "TRAVESSA", "id": "TRAVESSA" },
        { "desc": "TRECHO", "id": "TRECHO" },
        { "desc": "TREVO", "id": "TREVO" },
        { "desc": "VALE", "id": "VALE" },
        { "desc": "VEREDA", "id": "VEREDA" },
        { "desc": "VIA", "id": "VIA" },
        { "desc": "VIADUTO", "id": "VIADUTO" },
        { "desc": "VIELA", "id": "VIELA" },
        { "desc": "VILA", "id": "VILA" }
    ];

    const userToken = sessionStorage.getItem("userToken") ?? "";
    const localidade = {
        buscarEstados: async () => {
            let result = await new LocalidadesRepository().getStates(userToken, undefined, undefined);
            if (!result || result.length == 0) { return [] }
            result = result.filter((VALUE) => VALUE.stateName != "EXTERIOR");
            return result.map(VALUE => ({
                "id": VALUE.codigo,
                "desc": VALUE.stateName,
                "optionOriginalValue": VALUE
            }));
        },
        buscarMunicipios: async () => {
            let codigoRef = props.refsMap.get("estadoID")?.current.value;
            if (!codigoRef) { return [] }
            let result = await new LocalidadesRepository().getCities(userToken, undefined, codigoRef ?? undefined);
            if (!result || result.length == 0) { return [] }
            return result.map(VALUE => ({
                "id": VALUE.codigo,
                "desc": VALUE.cityName,
                "optionOriginalValue": VALUE
            }));
        }
    }

    const [estadoValorSelecionado, setEstadoValorSelecionado] = useState<IOption | null | undefined>(undefined);
    const [municipioValorSelecionado, setMunicipioValorSelecionado] = useState<IOption | null | undefined>(undefined);
    return (
        <div className={style['fields-container']}>
            <TextFieldComponent readonly inputRef={props.refsMap.get("codigo")} id={style["codigo"]} value={props.value?.codigo ?? GUID.getGUID()} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent inputRef={props.refsMap.get("cep")} id={style["cep"]} value={props.value?.cep ?? ""} sx={{ width: "100%" }} label='cep' mask='#####-###' />
            <SelectComponent
                inputLabel='Tipo de Endereço'
                sx={{ width: "100%" }}
                asyncOptions={false}
                id={style["tipoEndereco"]}
                defaulOption={(() => {
                    let value = props.value?.tipoEndereco ?? "";
                    if (value) {
                        return { "desc": value, "id": value };
                    }
                    return undefined;
                })()}
                options={tipoenderecoOptions}
                inputRefID={props.refsMap.get("tipoEndereco")}
            />
            <TextFieldComponent inputRef={props.refsMap.get("rua")} id={style["rua"]} value={props.value?.rua ?? ""} sx={{ width: "100%" }} label='Rua' />
            <TextFieldComponent inputRef={props.refsMap.get("numero")} id={style["numero"]} value={props.value?.numero ?? ""} sx={{ width: "100%" }} label='Número' />
            <TextFieldComponent inputRef={props.refsMap.get("bairro")} id={style["bairro"]} value={props.value?.bairro ?? ""} sx={{ width: "100%" }} label='Bairro' />
            <SelectComponent
                inputLabel='Estado'
                sx={{ width: "100%" }}
                asyncOptions={true}
                id={style["estado"]}
                defaulOption={(() => {
                    let value = props.value?.estado ?? "";
                    if (value) {
                        return { "desc": value, "id": value };
                    }
                    return undefined;
                })()}
                getOptions={localidade.buscarEstados}
                options={tipoenderecoOptions}
                inputRefDesc={props.refsMap.get("estado")}
                inputRefID={props.refsMap.get("estadoID")}
                callBackOption={setEstadoValorSelecionado}
            />
            <TextFieldComponent
                inputRef={props.refsMap.get("codigoIBGEEstado")}
                id={style["codigoIBGEEstado"]}
                value={(() => {
                    if (estadoValorSelecionado) {
                        let value = estadoValorSelecionado.optionOriginalValue as EstadoModel;
                        return value.stateIBGECode;
                    } else if (estadoValorSelecionado === null) {
                        return "";
                    } else if (props.value?.codigoIBGEEstado) {
                        return props.value.codigoIBGEEstado;
                    }
                    return "";
                })()}
                sx={{ width: "100%" }}
                label='Código IBGE Estado'
            />
            <SelectComponent
                inputLabel='Cidade'
                sx={{ width: "100%" }}
                asyncOptions={true}
                id={style["cidade"]}
                defaulOption={(() => {
                    let value = props.value?.cidade ?? "";
                    if (value) {
                        return { "desc": value, "id": value };
                    }
                    return undefined;
                })()}
                getOptions={localidade.buscarMunicipios}
                options={tipoenderecoOptions}
                inputRefDesc={props.refsMap.get("cidade")}
                inputRefID={props.refsMap.get("cidadeID")}
                callBackOption={setMunicipioValorSelecionado}
            />
            <TextFieldComponent
                inputRef={props.refsMap.get("codigoIBGECidade")}
                id={style["codigoIBGECidade"]}
                value={(() => {
                    if (municipioValorSelecionado) {
                        let value = municipioValorSelecionado.optionOriginalValue as MunicipioModel;
                        return value.cityIBGECode;
                    } else if (municipioValorSelecionado === null) {
                        return "";
                    } else if (props.value?.codigoIBGECidade) {
                        return props.value.codigoIBGECidade;
                    }
                    return "";
                })()}
                sx={{ width: "100%" }}
                label='Código IBGE Cidade'
            />
        </div>
    )
}



export default CadastroEndereco;

