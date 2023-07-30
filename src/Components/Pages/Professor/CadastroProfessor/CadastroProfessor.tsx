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
import { useNavigate, useParams } from 'react-router-dom';
import RefFormatter from '../../../../utils/RefFormatter';
import ProfessorModel from '../../../../Models/Objects/ProfessorModel';
import { useQuery } from 'react-query';
import { GUID } from '../../../../utils/GUID';
import TryParse from '../../../../utils/TryParse';
import { Backdrop, CircularProgress } from '@mui/material';
import DateFormat from '../../../../utils/DateFormat';
import Swal from 'sweetalert2';

const CadastroProfessor = () => {
    const [tabShow, setTabShow] = useState<number>(0);
    const professorContext = useContext(ProfessorContext);
    const navigate = useNavigate();
    const [professorValorSelecionado, setProfessorValorSelecionado] = useState<IOption[] | null | undefined>(undefined);
    let refsMap = RefFormatter.generateObjectRefs(new ProfessorModel(), ["codigoRef"]);
    const { codigo } = useParams();

    const { isFetching: professorIsFetching } = useQuery(
        ["professor", codigo],
        (async () => {
            let result;
            if (!codigo) {
                result = ProfessorModel.constructorMethod(GUID.getGUID());
            } else {
                result = await professorContext?.getProfessor(codigo);
            }

            if (result) {
                professorContext?.setProfessor(result);
            } else {
                navigate("/main/professor/page");
            }
        }),
        { refetchOnWindowFocus: false, cacheTime: 0 }
    );

    const saveProfessor = useCallback(async () => {
        let professor: ProfessorModel = RefFormatter.getObjectFromRefs(new ProfessorModel(), refsMap);

        professor.cargaHoraria = professor.cargaHoraria ? Number(professor.cargaHoraria) : 0;
        professor.valorHoraAula = professor.valorHoraAula ? Number(professor.valorHoraAula) : 0;
        professor.dataInicioContratacao = professor.dataInicioContratacao ? DateFormat.getISODateFromBRDate(professor.dataInicioContratacao) : "";
        professor.pessoaCPF = professor.pessoaCPF ? professor.pessoaCPF.replace(/[^0-9]/g, "") : "";

        let result;
        if (codigo) {
            result = await professorContext?.alterarProfessor(professor);
        } else {
            result = await professorContext?.addProfessor(professor);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                navigate("/main/professor");
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }

    }, [refsMap]);

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={professorIsFetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={styles['container']}>
                <div className={styles['fields-container']}>
                    {/* Campos */}
                    <>
                        <><TextFieldComponent label='Código'
                            id={styles["codigo"]}
                            sx={{ width: "330px" }}
                            readonly
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
                                let id = professorContext?.professor?.pessoaID;
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
                                    if (!value) { return undefined };

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
                                    if (!value) { return undefined };

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
                                    if (!value) { return undefined };

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
                                    if (!value) { return undefined };

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
                            defaulOption={(() => {
                                let desc = professorContext?.professor?.tipoContrato;
                                let id = professorContext?.professor?.tipoContrato;
                                if (desc && id) {
                                    return [{
                                        id: id,
                                        desc: desc
                                    }]
                                }

                            })()}
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
                            defaulOption={(() => {
                                let desc = (() => {
                                    let value = professorContext?.professor?.areaAtuacao;
                                    if (!value) { return undefined };

                                    let parseValue = TryParse(value);
                                    if (Array.isArray(parseValue)) {
                                        return parseValue as string[];
                                    } else if (typeof parseValue == "string") {
                                        return parseValue;
                                    }
                                    return undefined;
                                })();

                                let id = (() => {
                                    let value = professorContext?.professor?.areaAtuacaoID;
                                    if (!value) { return undefined };

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
                                }
                                else if (typeof desc == "string" && typeof id == "string") {
                                    return [{
                                        "desc": desc,
                                        "id": id
                                    }]
                                }
                            })()}
                        />
                        </>
                        <><TextFieldComponent label='Valor da Hora-Aula'
                            id={styles["valor_da_hora_aula"]}
                            sx={{ width: "100%" }}
                            type='monetary'
                            inputRef={refsMap.get("valorHoraAula")}
                            value={professorContext?.professor?.valorHoraAula}
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
        </>
    );
}




export default CadastroProfessor;