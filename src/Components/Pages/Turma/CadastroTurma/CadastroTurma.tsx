import { Backdrop, CircularProgress, Tab, Tabs } from "@mui/material";
import style from "./CadastroTurma.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import TextFieldComponent from "../../../Components/TextField/TextFieldComponent";
import DateField from "../../../Components/DateField/DateField";
import SelectComponent from "../../../Components/Select/SelectComponent";
import SelectSearchComponent from "../../../Components/SelectSearch/SelectSearchComponent";
import { useTurmaContext } from "../TurmaContext";
import TurmaModel from "../../../../Models/Objects/TurmaModel";
import { useQuery } from "react-query";
import RefFormatter from "../../../../utils/RefFormatter";




const CadastroTurma = () => {
    const context = useTurmaContext();
    const [tabShow, setTabShow] = useState<number>(0);
    const { codigo } = useParams();
    const navigate = useNavigate();
    let refsMap = RefFormatter.generateObjectRefs(new TurmaModel(), []);

    const { isFetching } = useQuery(
        ["turma", codigo],
        (async () => {
            if (codigo) {
                let result = await context.getTurma(codigo);
                if (!result) { navigate("/main/turma/page"); return; }
                context.setTurma(result);
            }
            context.setTurma(new TurmaModel());
        }),
        { refetchOnWindowFocus: false, cacheTime: 0 }
    );

    const save = async () => {
        let data = RefFormatter.getObjectFromRefs(new TurmaModel(), refsMap);
        console.log(data);
    }

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isFetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                    <CadastroTurmaContent refsMap={refsMap} />
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
                            await save();
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
        </>
    );
}

const CadastroTurmaContent = ({ refsMap }: { refsMap: Map<string, React.MutableRefObject<any>> }) => {
    const context = useTurmaContext();

    return (
        <div className={style["cadastro_turma_content_container"]}>
            <><TextFieldComponent label='Código'
                value={context.turma?.codigo}
                readonly
                id={style["codigo"]}
                sx={{ width: "100%" }}
                inputRef={refsMap.get("codigo")}
            />
            </>
            <><TextFieldComponent label='Código da Turma'
                id={style["codigo_da_turma"]}
                sx={{ width: "100%" }}
                value={context.turma?.classCode}
                inputRef={refsMap.get("classCode")}
            />
            </>
            <><DateField label={"Ano Letivo"}
                value={(() => {
                    let value = context.turma?.schoolYear;
                    if (value) {
                        return value.toString();
                    }
                })()}
                id={style["ano_letivo"]}
                sx={{ width: "100%" }}
                inputDateFormat="YYYY"
                inputRef={refsMap.get("schoolYear")}

            />
            </>
            <><SelectComponent inputLabel='Status da Turma'
                id={style["status_da_turma"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                defaulOption={(() => {
                    let value = context.turma?.classStatus;
                    if (value) {
                        return [{ "desc": value, "id": value }]
                    }
                })()}
                options={[
                    { "desc": "ABERTA", "id": "ABERTA" },
                    { "desc": "FECHADA", "id": "FECHADA" }
                ]}
                inputRefDesc={refsMap.get("classStatus")}
            />
            </>
            <><SelectComponent inputLabel='Nível da Turma'
                id={style["nivel_da_turma"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                defaulOption={(() => {
                    let value = context.turma?.gradeLevel;
                    if (value) {
                        return [{ "desc": value, "id": value }]
                    }
                })()}
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
                inputRefDesc={refsMap.get("gradeLevel")}

            />
            </>
            <><SelectComponent inputLabel='Turno'
                id={style["turno"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                defaulOption={(() => {
                    let value = context.turma?.classShift;
                    if (value) {
                        return [{ "desc": value, "id": value }]
                    }
                })()}
                options={[
                    { "desc": "MANHÃ", "id": "MANHÃ" },
                    { "desc": "TARDE", "id": "TARDE" },
                    { "desc": "NOITE", "id": "NOITE" }

                ]}
                inputRefDesc={refsMap.get("classShift")}

            />
            </>
            <><SelectSearchComponent inputLabel='Professor Responsável'
                id={style["professor_responsavel"]}
                sx={{ width: "100%" }}
                defaulOption={(() => {
                    let desc = context.turma?.responsibleTeacher;
                    let id = context.turma?.responsibleTeacherID;
                    if (desc && id) {
                        return [{ "desc": desc, "id": id }]
                    }
                })()}
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
                inputRefDesc={refsMap.get("responsibleTeacher")}
                inputRefID={refsMap.get("responsibleTeacherID")}
            />
            </>
            <><DateField label='Data de Início da Turma'
                value={context.turma?.classStartDate}
                id={style["data_de_inicio_da_turma"]}
                sx={{ width: "100%" }}
                inputRef={refsMap.get("classStartDate")}
            />
            </>
            <><DateField label='Data de Fim da Turma'
                value={context.turma?.classEndtDate}
                id={style["data_de_fim_da_turma"]}
                sx={{ width: "100%" }}
                inputRef={refsMap.get("classEndtDate")}
            />
            </>
            <><TextFieldComponent label='Carga Horária Total'
                value={context.turma?.totalWorkload}
                id={style["carga_horaria_total"]}
                sx={{ width: "100%" }}
                type="number"
                inputRef={refsMap.get("totalWorkload")}
            />
            </>
            <><TextFieldComponent label='Carga Horária Complementar'
                value={context.turma?.supplementaryWorkload}
                id={style["carga_horaria_complementar"]}
                sx={{ width: "100%" }}
                type="number"
                inputRef={refsMap.get("supplementaryWorkload")}
            />
            </>
            <><TextFieldComponent label='Observações'
                value={context.turma?.observations}
                multiline={{ rows: 6 }}
                id={style["observacoes"]}
                sx={{ width: "100%", height: "100%" }}
                inputRef={refsMap.get("observations")}
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


