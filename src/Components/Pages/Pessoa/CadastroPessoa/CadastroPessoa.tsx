import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useContext, useEffect, useMemo, useState } from 'react';
import DateField from '../../../Components/DateField/DateField';
import TextFieldComponent from '../../../Components/TextField/TextFieldComponent';
import styles from './CadastroPessoa.module.css'
import CadastroContatos from './CadastroContatos/CadastroContatos';
import CadastroEndereco from './CadastroEndereco/CadastroEndereco';
import ButtonComponent from '../../../Components/Button/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { PessoaContext } from '../PessoaContext';
import { PessoaModel } from '../../../../Models/Objects/PessoaModel';
import { GUID } from '../../../../utils/GUID';
import RefFormatter from '../../../../utils/RefFormatter';
import DateFormat from '../../../../utils/DateFormat';
import Swal from 'sweetalert2';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SelectComponent, { IOption } from '../../../Components/Select/SelectComponent';
import LocalidadesRepository from '../../../../Repository/Implementations/LocalidadesRepository';
import { useQuery } from 'react-query';
import TryParse from '../../../../utils/TryParse';



const CadastroPessoa = () => {
    const navigate = useNavigate();
    const pessoaContext = useContext(PessoaContext);
    const pessoaID = new URLSearchParams(useLocation().search).get("codigo");

    const { isFetching } = useQuery(
        ["pessoa", pessoaID],
        (async () => {
            let result;
            if (!pessoaID) {
                result = PessoaModel.constructorMethod(GUID.getGUID());
            } else {
                result = await pessoaContext?.buscarPessoa(pessoaID);
            }

            if (result) {
                pessoaContext?.setPessoa(result);
            } else {
                navigate("/main/pessoa/page");
            }

        }),
        { refetchOnWindowFocus: false, cacheTime: 0 }
    );

    let refsMap = RefFormatter.generateObjectRefs(new PessoaModel(), ["codigoRef"]);

    const userToken = sessionStorage.getItem("userToken") ?? "";

    const localidade = {
        buscarPaises: async (codigo?: string) => {
            let result = await new LocalidadesRepository().getCountries(userToken);
            if (!result || result.length == 0) { return [] }
            return result.map(VALUE => ({
                "id": VALUE.codigo,
                "desc": VALUE.countryName
            }));
        },
        buscarEstados: async () => {
            let codigoRef = refsMap.get("nacionalidadePaisID")?.current.value;
            if (!codigoRef) { return [] }
            let result = await new LocalidadesRepository().getStates(userToken, undefined, codigoRef ?? undefined);
            if (!result || result.length == 0) { return [] }
            return result.map(VALUE => ({
                "id": VALUE.codigo,
                "desc": VALUE.stateName
            }));
        },
        buscarMunicipios: async () => {
            let codigoRef = refsMap.get("nacionalidadeEstadoID")?.current.value;
            if (!codigoRef) { return [] }
            let result = await new LocalidadesRepository().getCities(userToken, undefined, codigoRef ?? undefined);
            if (!result || result.length == 0) { return [] }
            return result.map(VALUE => ({
                "id": VALUE.codigo,
                "desc": VALUE.cityName
            }));
        }
    };

    const savePessoa = async () => {
        let pessoa: any = RefFormatter.getObjectFromRefs(new PessoaModel(), refsMap);

        pessoa.cpf = pessoa?.cpf ? pessoa.cpf.replace(/[^0-9]/g, '') : "";
        pessoa.dataNascimento = pessoa?.dataNascimento ? DateFormat.getISODateFromBRDate(pessoa.dataNascimento) : "";
        pessoa.rg = pessoa?.rg ? pessoa.rg.replace(/[^0-9]/g, '') : "";
        pessoa.tituloEleitorExpedicao = pessoa.tituloEleitorExpedicao ? DateFormat.getISODateFromBRDate(pessoa.tituloEleitorExpedicao) : "";
        pessoa.tituloEleitorNumero = pessoa?.tituloEleitorNumero ? pessoa.tituloEleitorNumero.replace(/[^0-9]/g, '') : "";
        pessoa.tituloEleitorSecao = pessoa?.tituloEleitorSecao ? pessoa.tituloEleitorSecao.replace(/[^0-9]/g, '') : "";
        pessoa.tituloEleitorZona = pessoa?.tituloEleitorZona ? pessoa.tituloEleitorZona.replace(/[^0-9]/g, '') : "";

        let result;
        if (pessoaID) {
            result = await pessoaContext?.modificarPessoa(pessoa);
        } else {
            result = await pessoaContext?.addPessoa(pessoa);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                navigate("/main/pessoa");
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }


        return pessoa as PessoaModel;
    }

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isFetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={styles["pessoa-cadastro-container"]}>
                <Avatar id={styles["foto"]} sx={{ width: "110px", height: "110px" }} />
                <div className={styles['fields-container']}>
                    <><TextFieldComponent label='Código'
                        readonly
                        inputRef={refsMap.get("codigo")}
                        value={pessoaContext?.pessoa?.codigo ?? ""}
                        id={styles["codigo"]}
                        sx={{ width: "330px" }}
                    />
                    </>
                    <><TextFieldComponent label='Nome'
                        inputRef={refsMap.get("nome")}
                        value={pessoaContext?.pessoa?.nome ?? ""}
                        id={styles["nome"]}
                        sx={{ width: "100%" }}
                        required
                    />
                    </>
                    <><TextFieldComponent label='CPF'
                        inputRef={refsMap.get("cpf")}
                        value={pessoaContext?.pessoa?.cpf ?? ""}
                        id={styles["cpf"]} sx={{ width: "100%" }}
                        mask='###.###.###-##'
                        required
                    />
                    </>
                    <><TextFieldComponent label='RG'
                        inputRef={refsMap.get("rg")}
                        value={pessoaContext?.pessoa?.rg ?? ""}
                        id={styles["rg"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><DateField label='Data de Nasimento'
                        inputRef={refsMap.get("dataNascimento")}
                        value={pessoaContext?.pessoa?.dataNascimento ?? ""}
                        id={styles["dataNascimento"]}
                        sx={{ width: "100%" }}
                        required
                    />
                    </>
                    <><SelectComponent inputLabel='Pais'
                        sx={{ width: "100%" }}
                        asyncOptions={true}
                        id={styles["nacionalidadePais"]}
                        defaulOption={(() => {
                            let desc = pessoaContext?.pessoa?.nacionalidadePais;
                            let id = pessoaContext?.pessoa?.nacionalidadePaisID;
                            if (desc && id) {
                                return [{ "desc": desc, "id": id }] as IOption[];
                            }
                        })()}
                        getOptions={localidade.buscarPaises}
                        inputRefDesc={refsMap.get("nacionalidadePais")}
                        inputRefID={refsMap.get("nacionalidadePaisID")}
                    />
                    </>
                    <><SelectComponent inputLabel='Estado'
                        sx={{ width: "100%" }}
                        asyncOptions={true}
                        id={styles["nacionalidadeEstado"]}
                        defaulOption={(() => {
                            let desc = pessoaContext?.pessoa?.nacionalidadeEstado;
                            let id = pessoaContext?.pessoa?.nacionalidadeEstadoID;
                            if (desc && id) {
                                return [{ "desc": desc, "id": id }] as IOption[];
                            }
                        })()}
                        getOptions={localidade.buscarEstados}
                        inputRefDesc={refsMap.get("nacionalidadeEstado")}
                        inputRefID={refsMap.get("nacionalidadeEstadoID")}
                    />
                    </>
                    <><SelectComponent inputLabel='Municipio'
                        sx={{ width: "100%" }}
                        asyncOptions={true}
                        id={styles["nacionalidadeMunicipio"]}
                        defaulOption={(() => {
                            let desc = pessoaContext?.pessoa?.nacionalidadeMunicipio;
                            let id = pessoaContext?.pessoa?.nacionalidadeMunicipioID;
                            if (desc && id) {
                                return [{ "desc": desc, "id": id }] as IOption[];
                            }
                        })()}
                        getOptions={localidade.buscarMunicipios}
                        inputRefDesc={refsMap.get("nacionalidadeMunicipio")}
                        inputRefID={refsMap.get("nacionalidadeMunicipioID")}
                    />
                    </>
                    <><SelectComponent inputLabel='Sexo'
                        inputRefID={refsMap.get("sexo")}
                        sx={{ width: "100%" }}
                        asyncOptions={false}
                        id={styles["sexo"]}
                        defaulOption={(() => {
                            let value = pessoaContext?.pessoa?.sexo ?? "";
                            if (value) {
                                return [{ "desc": value, "id": value }] as IOption[];
                            }
                        })()}
                        options={[
                            { "desc": "MASCULINO", "id": "MASCULINO" },
                            { "desc": "FEMININO", "id": "FEMININO" }
                        ]}
                    />
                    </>
                    <><SelectComponent inputLabel='Estado Civil'
                        inputRefID={refsMap.get("estadoCivil")}
                        sx={{ width: "100%" }}
                        asyncOptions={false}
                        id={styles["estadoCivil"]}
                        defaulOption={(() => {
                            let value = TryParse(pessoaContext?.pessoa?.estadoCivil ?? "");
                            if (value) {
                                if (typeof value == "object") {
                                    return value.map((VALUE: any) => { return { "desc": VALUE, "id": VALUE } });
                                }
                                return [{ "desc": value, "id": value }] as IOption[];
                            }
                        })()}
                        options={[
                            { "desc": "SOLTEIRO (A)", "id": "SOLTEIRO (A)" },
                            { "desc": "CASADO (A)", "id": "CASADO (A)" },
                            { "desc": "SEPARADO (A)", "id": "SEPARADO (A)" },
                            { "desc": "DIVORCIADO (A)", "id": "DIVORCIADO (A)" },
                            { "desc": "VIÚVO (A)", "id": "VIÚVO (A)" }
                        ]}
                    />
                    </>
                    <><TextFieldComponent label='N° Título de eleitor'
                        inputRef={refsMap.get("tituloEleitorNumero")}
                        value={pessoaContext?.pessoa?.tituloEleitorNumero ?? ""}
                        id={styles["tituloEleitorNumero"]} sx={{ width: "100%" }}
                        mask='### ### ###' />
                    </>
                    <><TextFieldComponent label='Zona Título de eleitor'
                        inputRef={refsMap.get("tituloEleitorZona")}
                        value={pessoaContext?.pessoa?.tituloEleitorZona ?? ""}
                        id={styles["tituloEleitorZona"]} sx={{ width: "100%" }}
                        mask='###'
                    />
                    </>
                    <><TextFieldComponent label='Seção'
                        inputRef={refsMap.get("tituloEleitorSecao")}
                        value={pessoaContext?.pessoa?.tituloEleitorSecao ?? ""}
                        id={styles["tituloEleitorSecao"]} sx={{ width: "100%" }}
                        mask='####'
                    />
                    </>
                    <><DateField label='Expedição Título de Eleitor'
                        inputRef={refsMap.get("tituloEleitorExpedicao")}
                        value={pessoaContext?.pessoa?.tituloEleitorExpedicao ?? ""}
                        id={styles["tituloEleitorExpedicao"]} sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Estado Título de Eleitor'
                        inputRef={refsMap.get("tituloEleitorEstado")}
                        value={pessoaContext?.pessoa?.tituloEleitorEstado ?? ""}
                        id={styles["tituloEleitorEstado"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Nome do Pai'
                        inputRef={refsMap.get("nomePai")}
                        value={pessoaContext?.pessoa?.nomePai ?? ""}
                        id={styles["nomePai"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Nome da Mãe'
                        inputRef={refsMap.get("nomeMae")}
                        value={pessoaContext?.pessoa?.nomeMae ?? ""}
                        id={styles["nomeMae"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <> {/* TabsContatosEnderecos */}
                        {useMemo(() => {
                            return <TabsContatosEnderecos />
                        }, [])}
                    </>
                    <><ButtonComponent value='Salvar'
                        id={styles["btn_salvar"]}

                        variant='outlined'
                        style={{
                            color: '#222834',
                            backgroundColor: '#539553'
                        }}
                        onClick={async () => {
                            await savePessoa()
                        }}
                    />
                    </>
                    <><ButtonComponent value='Voltar'
                        id={styles["btn_voltar"]}
                        variant='outlined'
                        style={{
                            color: '#222834',
                            backgroundColor: '#6C757D'
                        }}
                        onClick={() => {
                            navigate("/main/pessoa")
                        }}
                    />
                    </>
                </div>
            </div>
        </>
    );
}

const TabsContatosEnderecos = () => {
    const [tabShow, setTabShow] = useState(0);

    return (
        <>
            <div id={styles["contatos_enderecos_tabs"]}>
                <Tabs value={tabShow} onChange={(event: React.SyntheticEvent, newValue: number) => { setTabShow(newValue); }}>
                    <Tab label="Contatos" />
                    <Tab label="Endereços" />
                </Tabs>
            </div>
            {
                (() => {
                    if (tabShow == 0) {
                        return (
                            <div id={styles[`tab_container`]} >
                                <CadastroContatos />
                            </div>
                        )
                    } else if (tabShow == 1) {
                        return (
                            <div id={styles[`tab_container`]}>
                                <CadastroEndereco />
                            </div>
                        )
                    }
                })()
            }
        </>
    );
}

export default CadastroPessoa;