import { useCallback, useContext, useEffect, useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/TextFieldComponent';
import styles from './CadastroProfessor.module.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CadastroExperiencias from './CadastroExperiencias/CadastroExperiencias';
import CadastroCursos from './CadastroCursos/CadastroCursos';
import CadastroIdiomas from './CadastroIdiomas/CadastroIdiomas';
import { ProfessorContext } from '../ProfessorContext';
import SelectSearchComponent from '../../../Components/SelectSearch/SelectSearchComponent';
import SelectComponent, { IOption } from '../../../Components/Select/SelectComponent';
import DateField from '../../../Components/DateField/DateField';
import ButtonComponent from '../../../Components/Button/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import RefFormatter from '../../../../utils/RefFormatter';
import ProfessorModel from '../../../../Models/Objects/ProfessorModel';
import { useQuery } from 'react-query';
import { GUID } from '../../../../utils/GUID';
import TryParse from '../../../../utils/TryParse';



const CadastroProfessor = () => {
    const [tabShow, setTabShow] = useState<number>(0);
    const professorContext = useContext(ProfessorContext);
    const navigate = useNavigate();
    const [professorValorSelecionado, setProfessorValorSelecionado] = useState<IOption[] | null | undefined>(undefined);
    let refsMap = RefFormatter.generateObjectRefs(new ProfessorModel(), ["codigoRef"]);
    const professorID = new URLSearchParams(useLocation().search).get("codigo");

    const { data, isFetched, isFetching } = useQuery(
        ["professor", professorID],
        (async () => {
            if (!professorID) { return ProfessorModel.constructorMethod(GUID.getGUID()); }
            let result = await professorContext?.getProfessor(professorID);
            if (result) { return result }

            return null;
        }),
        { refetchOnWindowFocus: false, cacheTime: 0 }
    );

    useEffect(() => {
        if (isFetched) {
            if (data) {
                professorContext?.setProfessor(data);
            } else {
                navigate("/main/professor/page");
            }
        }
    }, [isFetched])

    const saveProfessor = useCallback(() => {
        let professor: any = RefFormatter.getObjectFromRefs(new ProfessorModel(), refsMap);

        console.log(professor);
    }, [refsMap]);

    return (
        <div className={styles['container']}>
            <div className={styles['fields-container']}>
                {/* Campos */}
                <>
                    <><TextFieldComponent label='Código'
                        id={styles["codigo"]}
                        sx={{ width: "330px" }}
                        inputRef={refsMap.get("codigo")}
                        value={professorContext?.professor?.codigo}
                    />
                    </>
                    <><SelectSearchComponent inputLabel='Pessoa'
                        id={styles["pessoa"]}
                        callBackOption={setProfessorValorSelecionado}
                        getOptions={async (textSearch: string, skip: number, take: number) => {
                            let result = await professorContext?.getPersons(textSearch, skip, take);
                            if (result) {
                                return result.map(VALUE => {
                                    return {
                                        "desc": VALUE.nome,
                                        "id": VALUE.codigo,
                                        "optionOriginalValue": VALUE
                                    }
                                });
                            }
                            return [];
                        }}
                        countOptions={async (textSearch?: string) => {
                            let result = await professorContext?.countPersons(textSearch);
                            return result ?? 0;
                        }}
                        inputRefDesc={refsMap.get("pessoa")}
                        inputRefID={refsMap.get("pessoaID")}
                        defaulOption={(() => {
                            let desc = professorContext?.professor?.pessoa;
                            let id = professorContext?.professor?.codigo;
                            if (desc && id) {
                                return [{
                                    id: id,
                                    desc: desc
                                }]
                            }
                        })()}
                    />
                    </>
                    <><TextFieldComponent label='CPF'
                        id={styles["cpf"]}
                        sx={{ width: "100%" }}
                        readonly
                        value={(() => {
                            if (professorValorSelecionado) {
                                return professorValorSelecionado[0].optionOriginalValue.cpf;
                            } else if (professorValorSelecionado === undefined) {
                                return professorContext?.professor?.pessoaCPF ?? "";
                            }
                            return "";
                        })()}
                        mask='###.###.###-##'
                        inputRef={refsMap.get("pessoaCPF")}
                    />
                    </>
                    <><SelectSearchComponent inputLabel='Função'
                        id={styles["funcao"]}
                        sx={{ width: "100%" }}
                        getOptions={useCallback(async (textSearch: string, skip: number, take: number) => {
                            let result = await professorContext?.getFuncao(skip, take, textSearch);
                            if (result) {
                                return result.map(VALUE => {
                                    return {
                                        "desc": VALUE.position,
                                        "id": VALUE.codigo,
                                        "optionOriginalValue": VALUE
                                    }
                                });
                            }
                            return [];
                        }, [])}
                        countOptions={async (textSearch: string) => {
                            let result = await professorContext?.countFuncao(textSearch);
                            return result ?? 0;
                        }}
                        inputRefDesc={refsMap.get("funcao")}
                        inputRefID={refsMap.get("funcaoID")}
                        defaulOption={(() => {
                            let desc = professorContext?.professor?.funcao;
                            let id = professorContext?.professor?.funcaoID;
                            if (desc && id) {
                                return [{
                                    id: id,
                                    desc: desc
                                }]
                            }

                        })()}
                    />
                    </>
                    <><TextFieldComponent label='Carga horária'
                        id={styles["carga_horaria"]}
                        sx={{ width: "100%" }}
                        type='number'
                        inputRef={refsMap.get("cargaHoraria")}
                        value={professorContext?.professor?.cargaHoraria}
                    />
                    </>
                    <><SelectSearchComponent inputLabel='Formações Acadêmicas'
                        id={styles["formaçoes_academicas"]}
                        sx={{ width: "100%" }}
                        getOptions={async (textSearch: string, skip: number, take: number) => {
                            let result = await professorContext?.getFormacao(textSearch, skip, take);
                            if (result) {
                                return result.map(VALUE => {
                                    return {
                                        "desc": VALUE.education,
                                        "id": VALUE.codigo,
                                        "optionOriginalValue": VALUE
                                    }
                                });
                            }
                            return [];
                        }}
                        countOptions={async (textSearch: string) => {
                            let result = await professorContext?.countFormacao(textSearch);
                            return result ?? 0;
                        }}
                        multiple
                        inputRefDesc={refsMap.get("formacaoAcademica")}
                        inputRefID={refsMap.get("formacaoAcademicaID")}
                        defaulOption={(() => {
                            let desc = (() => {
                                let value = professorContext?.professor?.formacaoAcademica;
                                if (!value) { return "" };

                                let parseValue = TryParse(value);
                                if (Array.isArray(parseValue)) {
                                    return parseValue as string[];
                                } else if (typeof parseValue == "string") {
                                    return parseValue;
                                }
                                return undefined;
                            })();

                            let id = (() => {
                                let value = professorContext?.professor?.formacaoAcademicaID;
                                if (!value) { return "" };

                                let parseValue = TryParse(value);
                                if (Array.isArray(parseValue)) {
                                    return parseValue as string[];
                                } else if (typeof parseValue == "string") {
                                    return parseValue;
                                }
                                return undefined;
                            })();

                            if (Array.isArray(desc) && Array.isArray(id)) {
                                let valueMap = desc.map((VALUE, INDEX) => {
                                    return {
                                        "desc": VALUE,
                                        "id": (id as string[])[INDEX]
                                    };
                                });
                                return valueMap;
                            } else if (typeof desc == "string" && typeof id == "string") {
                                return [{
                                    "desc": desc,
                                    "id": id
                                }]
                            }

                            return undefined;
                        })()}
                    />
                    </>
                    <><DateField label='Data de Início da Contratação'
                        id={styles["data_de_inicio_da_contratacao"]}
                        sx={{ width: "100%" }}
                        inputRef={refsMap.get("dataInicioContratacao")}
                        value={professorContext?.professor?.dataInicioContratacao}
                    />
                    </>
                    <><SelectComponent inputLabel='Nívels de Ensino que Ministra'
                        id={styles["nivels_de_ensino_que_ministra"]}
                        sx={{ width: "100%" }}
                        multiple
                        asyncOptions={false}
                        options={[
                            { desc: "Educação infantil", id: "Educação infantil" },
                            { desc: "Ensino fundamental I", id: "Ensino fundamental I" },
                            { desc: "Ensino fundamental II", id: "Ensino fundamental II" },
                            { desc: "Ensino médio", id: "Ensino médio" },
                            { desc: "Ensino superior", id: "Ensino superior" },
                            { desc: "Pós-graduação", id: "Pós-graduação" }
                        ]}
                        inputRefDesc={refsMap.get("nivelEnsinoQueMinistra")}
                        defaulOption={(() => {
                            let desc = (() => {
                                let value = professorContext?.professor?.nivelEnsinoQueMinistra;
                                if (!value) { return "" };

                                let parseValue = TryParse(value);
                                if (Array.isArray(parseValue)) {
                                    return parseValue as string[];
                                } else if (typeof parseValue == "string") {
                                    return parseValue;
                                }
                                return undefined;
                            })();

                            let id = (() => {
                                let value = professorContext?.professor?.nivelEnsinoQueMinistra;
                                if (!value) { return "" };

                                let parseValue = TryParse(value);
                                if (Array.isArray(parseValue)) {
                                    return parseValue as string[];
                                } else if (typeof parseValue == "string") {
                                    return parseValue;
                                }
                                return undefined;
                            })();

                            if (Array.isArray(desc) && Array.isArray(id)) {
                                let valueMap = desc.map((VALUE, INDEX) => {
                                    return {
                                        "desc": VALUE,
                                        "id": (id as string[])[INDEX]
                                    };
                                });
                                return valueMap;
                            } else if (typeof desc == "string" && typeof id == "string") {
                                return [{
                                    "desc": desc,
                                    "id": id
                                }]
                            }

                            return undefined;
                        })()}
                    />
                    </>
                    <><SelectComponent inputLabel='Tipo de Contrato'
                        id={styles["tipo_de_contrato"]}
                        sx={{ width: "100%" }}
                        asyncOptions={false}
                        options={[
                            { desc: "Tempo determinado", id: "Tempo determinado" },
                            { desc: "Tempo indeterminado", id: "Tempo indeterminado" },
                            { desc: "Trabalho eventual", id: "Trabalho eventual" },
                            { desc: "Estágio", id: "Estágio" },
                            { desc: "Experiência", id: "Experiência" },
                            { desc: "Teletrabalho", id: "Teletrabalho" },
                            { desc: "Intermitente", id: "Ieletrabalho" },
                            { desc: "Autônomo", id: "Autônomo" }
                        ]}
                        inputRefDesc={refsMap.get("tipoContrato")}
                    />
                    </>
                    <><SelectSearchComponent inputLabel='Áreas de Atuação'
                        id={styles["areas_de_atuaçao"]}
                        sx={{ width: "100%" }}
                        multiple
                        getOptions={async (textSearch: string, skip: number, take: number) => {
                            let result = await professorContext?.getAreaAtuacao(textSearch, skip, take);
                            if (result) {
                                return result.map(VALUE => {
                                    return {
                                        "desc": VALUE.area,
                                        "id": VALUE.codigo,
                                        "optionOriginalValue": VALUE
                                    }
                                });
                            }
                            return [];
                        }}
                        countOptions={async (textSearch: string) => {
                            let result = await professorContext?.countAreaAtuacao(textSearch);
                            return result ?? 0;
                        }}
                        inputRefDesc={refsMap.get("areaAtuacao")}
                        inputRefID={refsMap.get("areaAtuacaoID")}
                    />
                    </>
                    <><TextFieldComponent label='Valor da Hora-Aula'
                        id={styles["valor_da_hora_aula"]}
                        sx={{ width: "100%" }}
                        type='monetary'
                        inputRef={refsMap.get("valorHoraAula")}
                    />
                    </>
                </>

                {/* ABAS */}
                <>
                    <div id={styles["abas"]}>
                        <Tabs value={tabShow} onChange={(event: React.SyntheticEvent, newValue: number) => { setTabShow(newValue); }}>
                            <Tab label="Experiências" />
                            <Tab label="Cursos" />
                            <Tab label="Idiomas" />
                        </Tabs>
                    </div>
                    {
                        useCallback(() => {
                            switch (tabShow) {
                                case 0:
                                    return (
                                        <CadastroExperiencias id={styles["showTab"]} />
                                    );
                                case 1:
                                    return (
                                        <CadastroCursos id={styles["showTab"]} />
                                    );
                                case 2:
                                    return (
                                        <CadastroIdiomas id={styles["showTab"]} />
                                    );
                            }
                        }, [tabShow])()
                    }
                </>

                {/* BOTOES */}
                <>
                    <><ButtonComponent value='Salvar'
                        id={styles["btn_salvar"]}
                        variant='outlined'
                        style={{
                            color: '#222834',
                            backgroundColor: '#539553'
                        }}
                        onClick={async () => {
                            await saveProfessor()
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
                            navigate("/main/professor");
                        }}
                    />
                    </>
                </>
            </div>
        </div>
    );
}




export default CadastroProfessor;
