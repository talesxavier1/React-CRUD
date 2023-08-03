import { Tab, Tabs } from "@mui/material";
import style from "./CadastroTurma.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import TextFieldComponent from "../../../Components/TextField/TextFieldComponent";
import DateField from "../../../Components/DateField/DateField";
import SelectComponent from "../../../Components/Select/SelectComponent";
import SelectSearchComponent from "../../../Components/SelectSearch/SelectSearchComponent";
import { useTurmaContext } from "../TurmaContext";

const CadastroTurma = () => {
    const [tabShow, setTabShow] = useState<number>(0);
    const { codigo } = useParams();
    const navigate = useNavigate();


    return (
        <div className={style["container"]} >
            <div className={style["header"]}>
                <h1>Turma</h1>
            </div>

            <div className={style["content_wrapper"]}>
                <div className={style["abas"]}>
                    <Tabs value={tabShow} onChange={(event: React.SyntheticEvent, newValue: number) => { setTabShow(newValue); }}>
                        <Tab label="TURMA" />
                        <Tab label="ALUNOS" />
                    </Tabs>
                </div>
                {(() => {
                    switch (tabShow) {
                        case 0:
                            return (
                                <CadastroTurmaContent />
                            );
                        case 1:
                            return (
                                <CadastroAlunos />
                            );
                    }
                })()}
            </div>
            {/* BOTOES */}
            <div className={style["buttons_container"]}>
                <><ButtonComponent value='Salvar'
                    id={style["btn_salvar"]}
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#539553'
                    }}
                    onClick={async () => {

                    }}
                />
                </>
                <><ButtonComponent value='Voltar'
                    id={style["btn_voltar"]}
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#6C757D'
                    }}
                    onClick={() => {
                        navigate("/main/turma");
                    }}
                />
                </>
            </div>
        </div >
    );
}

const CadastroTurmaContent = () => {
    const context = useTurmaContext();

    return (
        <div className={style["cadastro_turma_content_container"]}>
            <><TextFieldComponent label='Código'
                id={style["codigo"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Código da Turma'
                id={style["codigo_da_turma"]}
                sx={{ width: "100%" }}
            />
            </>
            <><DateField label={"Ano Letivo"}
                id={style["ano_letivo"]}
                sx={{ width: "100%" }}
                inputDateFormat="YYYY"
            />
            </>
            <><SelectComponent inputLabel='Status da Turma'
                id={style["status_da_turma"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                options={[
                    { "desc": "ABERTA", "id": "ABERTA" },
                    { "desc": "FECHADA", "id": "FECHADA" }
                ]}
            />
            </>
            <><SelectComponent inputLabel='Nível da Turma'
                id={style["nivel_da_turma"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                options={[
                    { "desc": "BERÇÁRIO", "id": "BERÇÁRIO" },
                    { "desc": "MATERNAL", "id": "MATERNAL" },
                    { "desc": "JARDIM DE INFÂNCIA", "id": "JARDIM DE INFÂNCIA" },
                    { "desc": "1º ANO ENSINO FUNDAMENTAL", "id": "1º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "2º ANO ENSINO FUNDAMENTAL", "id": "2º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "3º ANO ENSINO FUNDAMENTAL", "id": "3º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "4º ANO ENSINO FUNDAMENTAL", "id": "4º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "5º ANO ENSINO FUNDAMENTAL", "id": "5º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "6º ANO ENSINO FUNDAMENTAL", "id": "6º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "7º ANO ENSINO FUNDAMENTAL", "id": "7º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "8º ANO ENSINO FUNDAMENTAL", "id": "8º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "9º ANO ENSINO FUNDAMENTAL", "id": "9º ANO ENSINO FUNDAMENTAL" },
                    { "desc": "1º ANO DO ENSINO MÉDIO", "id": "1º ANO DO ENSINO MÉDIO" },
                    { "desc": "2º ANO DO ENSINO MÉDIO", "id": "2º ANO DO ENSINO MÉDIO" },
                    { "desc": "3º ANO DO ENSINO MÉDIO", "id": "3º ANO DO ENSINO MÉDIO" }
                ]}
            />
            </>
            <><SelectComponent inputLabel='Turno'
                id={style["turno"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                options={[
                    { "desc": "MANHÃ", "id": "MANHÃ" },
                    { "desc": "TARDE", "id": "TARDE" },
                    { "desc": "NOITE", "id": "NOITE" }

                ]}
            />
            </>
            <><SelectSearchComponent inputLabel='Professor Responsável'
                id={style["professor_responsavel"]}
                sx={{ width: "100%" }}
                getOptions={async (textSearch: string, skip: number, take: number) => {
                    let result = await context.getPessoas(skip, take, textSearch);
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
                    let result = await context.countPessoa(textSearch);
                    return result ?? 0;
                }}
            // inputRefDesc={refsMap.get("pessoa")}
            // inputRefID={refsMap.get("pessoaID")}
            // defaulOption={(() => {
            //     let desc = professorContext?.professor?.pessoa;
            //     let id = professorContext?.professor?.pessoaID;
            //     if (desc && id) {
            //         return [{
            //             id: id,
            //             desc: desc
            //         }]
            //     }
            // })()}
            />

            </>
            <><DateField label='Data de Início da Turma'
                id={style["data_de_inicio_da_turma"]}
                sx={{ width: "100%" }}
            />
            </>
            <><DateField label='Data de Fim da Turma'
                id={style["data_de_fim_da_turma"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Carga Horária Total'
                id={style["carga_horaria_total"]}
                sx={{ width: "100%" }}
                type="number"
            />
            </>
            <><TextFieldComponent label='Carga Horária Complementar'
                id={style["carga_horaria_complementar"]}
                sx={{ width: "100%" }}
                type="number"
            />
            </>
            <><TextFieldComponent label='Observações'
                multiline={{ rows: 6 }}
                id={style["observacoes"]}
                sx={{ width: "100%", height: "100%" }}
            />
            </>
        </div >
    );
}

const CadastroAlunos = () => {

    return (
        <>
            <h1>CadastroAlunos</h1>
        </>
    );
}

export default CadastroTurma;


