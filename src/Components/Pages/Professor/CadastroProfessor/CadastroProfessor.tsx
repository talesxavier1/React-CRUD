import { useCallback, useContext, useState } from 'react';
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



const CadastroProfessor = () => {
    const [tabShow, setTabShow] = useState<number>(0);
    const professorContext = useContext(ProfessorContext);

    const [pessoaValorSelecionado, setPessoaValorSelecionado] = useState<IOption[] | null>(null);
    return (
        <div className={styles['container']}>
            <div className={styles['fields-container']}>
                {/* SelectSearch */}
                {/* Campos */}
                <>
                    <><TextFieldComponent label='Código'
                        id={styles["codigo"]}
                        sx={{ width: "330px" }}
                    />
                    </>
                    <><SelectSearchComponent inputLabel='Pessoa'
                        id={styles["pessoa"]}
                        callBackOption={setPessoaValorSelecionado}
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
                    />
                    </>
                    <><TextFieldComponent label='CPF'
                        id={styles["cpf"]}
                        sx={{ width: "100%" }}
                        readonly
                        value={(() => {
                            if (pessoaValorSelecionado) {
                                let values = pessoaValorSelecionado.map(VALUE => VALUE.optionOriginalValue.cpf).join(",");
                                return values;
                            } else if (pessoaValorSelecionado === null) {
                                return "";
                            }
                            //  else if (props.value?.codigoIBGEEstado) {
                            //     return props.value.codigoIBGEEstado;
                            // }
                            return "";
                        })()}
                        mask='###.###.###-##'
                    />
                    </>
                    <><SelectSearchComponent inputLabel='Função'
                        id={styles["funcao"]}
                        sx={{ width: "100%" }}
                        getOptions={async (textSearch: string, skip: number, take: number) => {
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
                        }}
                        countOptions={async (textSearch: string) => {
                            let result = await professorContext?.countFuncao(textSearch);
                            return result ?? 0;
                        }}
                    />
                    </>
                    <><TextFieldComponent label='Carga horária'
                        id={styles["carga_horaria"]}
                        sx={{ width: "100%" }}
                        type='number'
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
                    />
                    </>
                    <><DateField label='Data de Início da Contratação'
                        id={styles["data_de_inicio_da_contratacao"]}
                        sx={{ width: "100%" }}
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
                    />
                    </>
                    <><TextFieldComponent label='Valor da Hora-Aula'
                        id={styles["valor_da_hora_aula"]}
                        sx={{ width: "100%" }}
                        type='monetary'
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
            </div>
        </div>
    );
}




export default CadastroProfessor;
