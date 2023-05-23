import { useCallback, useContext, useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/TextFieldComponent';
import styles from './CadastroProfessor.module.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CadastroExperiencias from './CadastroExperiencias/CadastroExperiencias';
import CadastroCursos from './CadastroCursos/CadastroCursos';
import CadastroIdiomas from './CadastroIdiomas/CadastroIdiomas';
import { ProfessorContext } from '../ProfessorContext';
import ButtonComponent from '../../../Components/Button/ButtonComponent';
import SelectSearchComponent from '../../../Components/SelectSearch/SelectSearchComponent';
import { PessoaModel } from '../../../../Models/Objects/PessoaModel';
import { IOption } from '../../../Components/Select/SelectComponent';



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
                        multiple={true}
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
                            return []
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
                    />
                    </>
                    <><TextFieldComponent label='Formações Acadêmicas'
                        id={styles["formaçoes_academicas"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Função'
                        id={styles["funcao"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Carga horária'
                        id={styles["carga_horaria"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Valor da Hora-Aula'
                        id={styles["valor_da_hora_aula"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Áreas de Atuação'
                        id={styles["areas_de_atuaçao"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Nívels de Ensino que Ministra'
                        id={styles["nivels_de_ensino_que_ministra"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Data de Início da Contratação'
                        id={styles["data_de_inicio_da_contratacao"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <><TextFieldComponent label='Tipo de Contrato'
                        id={styles["tipo_de_contrato"]}
                        sx={{ width: "100%" }}
                    />
                    </>
                    <ButtonComponent value='Adicionar' variant='outlined' style={{ color: '#222834', backgroundColor: '#539553' }} onClick={async () => {
                        // let result = await professorContext?.getPersons("Patrick Valentim Alcoforadogg")
                        // console.log(result);
                    }} />

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