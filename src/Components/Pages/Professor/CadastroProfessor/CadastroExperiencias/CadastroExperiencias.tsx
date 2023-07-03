import styles from "./CadastroExperiencias.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { MutableRefObject, useCallback, useContext, useMemo, useReducer, useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";
import DateField from "../../../../Components/DateField/DateField";
import SelectComponent from "../../../../Components/Select/SelectComponent";
import { ProfessorContext } from "../../ProfessorContext";
import SelectSearchComponent from "../../../../Components/SelectSearch/SelectSearchComponent";
import ExperienciaDeTrabalhoModel from "../../../../../Models/Objects/ExperienciaDeTrabalhoModel";
import { useQuery } from "react-query";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import Grid from "../../../../Components/Grid/Grid";
import DateFormat from "../../../../../utils/DateFormat";
import RefFormatter from "../../../../../utils/RefFormatter";
import { GUID } from "../../../../../utils/GUID";
import Swal from "sweetalert2";

interface ICadastroExperiencias {
    id: string
}

const CadastroExperiencias = (props: ICadastroExperiencias) => {
    const professorContext = useContext(ProfessorContext);
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: ExperienciaDeTrabalhoModel }>({ isOpen: false, content: undefined });

    const propriedadesColunas: GridColDef[] = useMemo((): GridColDef[] => {
        return [
            { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
            { field: 'nomeInstituicao', headerName: 'Nome da Institução', width: 300, sortable: false },
            { field: 'cargo', headerName: 'Cargo', width: 150, sortable: false },
            { field: 'areaAtuacao', headerName: 'Área de Atuação', width: 150, sortable: false },
            {
                field: 'dataInicio',
                headerName: 'Data de Início',
                width: 150,
                sortable: false,
                valueFormatter: (value) => {
                    if (!value.value) { return "" }
                    return DateFormat.formatDate({ format: "DD/MM/YYYY", isoDate: value.value })
                }
            },
            {
                field: 'dataFim',
                type: 'date',
                headerName: 'Data de Fim',
                width: 150,
                sortable: false,
                valueFormatter: (value) => {
                    if (!value.value) { return "" }
                    return DateFormat.formatDate({ format: "DD/MM/YYYY", isoDate: value.value })
                }
            },
            { field: 'regimeContratacao', headerName: 'Regime de Contratação', width: 200, sortable: false },
            { field: 'cargaHoraria', type: 'number', headerName: 'Carga Horária', width: 150, sortable: false },
            { field: 'salario', type: 'number', headerName: 'Salário', width: 150, sortable: false },
        ];
    }, [])

    const { isFetching: experienciasIsFetching, refetch: experienciasRefetch } = useQuery(
        ["experiencias", professorContext?.professor?.codigo, gridPage],
        (async () => {
            let result = await professorContext?.getExperiencias(gridPage * 5, 5, professorContext?.professor?.codigo);
            let resultCount = await professorContext?.countExperiencias(professorContext?.professor?.codigo);

            professorContext?.setExperiencias({
                count: resultCount ?? 0,
                experiencias: result ?? []
            });
        }),
        { refetchOnWindowFocus: false, cacheTime: 0, enabled: !!professorContext?.professor?.codigo }
    );

    let experienciaRefs = RefFormatter.generateObjectRefs(new ExperienciaDeTrabalhoModel(), ["codigoRef"]);

    const saveExperiencias = useCallback(async () => {
        let experiencia: ExperienciaDeTrabalhoModel = RefFormatter.getObjectFromRefs(new ExperienciaDeTrabalhoModel, experienciaRefs);

        experiencia.codigoRef = professorContext?.professor?.codigo ?? "";
        experiencia.dataInicio = experiencia.dataInicio ? DateFormat.getISODateFromBRDate(experiencia.dataInicio) : undefined;
        experiencia.dataFim = experiencia.dataFim ? DateFormat.getISODateFromBRDate(experiencia.dataFim) : undefined;
        experiencia.salario = experiencia.salario ? Number(experiencia.salario) : 0;
        experiencia.cargaHoraria = experiencia.cargaHoraria ? Number(experiencia.cargaHoraria) : 0;

        let result;
        if (professorContext?.experiencias?.experiencias.find(VALUE => VALUE.codigo == experiencia.codigo)) {
            result = await professorContext?.alterarExperiencia(experiencia);
        } else {
            result = await professorContext?.addExperiencia(experiencia);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalProps({ isOpen: false, content: undefined });
                experienciasRefetch();
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }

    }, [experienciaRefs, professorContext]);

    const deleteExperiencia = useCallback(async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await professorContext?.deleteExperiencia(VALUE.toString());
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
            experienciasRefetch();
        });

    }, [selectedRows])


    return (
        <div className={styles["container"]} id={props.id}>
            <div className={styles["buttons-container"]}>
                <><ModalComponent
                    modalAberto={modalProps.isOpen}
                    closeOpenModal={() => {
                        setModalProps({ isOpen: false, content: undefined });
                    }}
                    content={<Content experiencia={modalProps.content} refsMap={experienciaRefs} />}
                    btnSaveAction={saveExperiencias}
                />
                </>
                <><ButtonComponent value='Adicionar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#539553'
                    }}
                    onClick={() => {
                        setModalProps({ isOpen: true, content: undefined });
                    }}
                />
                </>
                <><ButtonComponent value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => {
                        let valueContent = professorContext?.experiencias?.experiencias.find((VALUE) => VALUE.codigo == selectedRows[0]);
                        setModalProps({ isOpen: true, content: valueContent });
                    }}
                    disabled={selectedRows.length != 1}
                />
                </>
                <><ButtonComponent
                    value='Excluir'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`
                    }}
                    disabled={selectedRows.length == 0}
                    onClick={() => { deleteExperiencia() }}
                />
                </>
            </div>
            <div className={styles["grid_container"]}>
                <Grid
                    loading={experienciasIsFetching}
                    linhasGrid={professorContext?.experiencias?.experiencias ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={professorContext?.experiencias?.count ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </div>
    )
}


const Content = (props: { experiencia?: ExperienciaDeTrabalhoModel, refsMap: Map<string, MutableRefObject<any>> }) => {
    const professorContext = useContext(ProfessorContext);

    return (
        <div className={styles["content_container"]}>
            <><TextFieldComponent label='Código'
                readonly
                inputRef={props.refsMap.get("codigo")}
                value={props.experiencia?.codigo ?? GUID.getGUID()}
                id={styles["codigo"]}
                sx={{ width: "330px" }}
            />
            </>
            <><TextFieldComponent label='Nome da Instituição'
                inputRef={props.refsMap.get("nomeInstituicao")}
                value={props.experiencia?.nomeInstituicao}
                id={styles["nome_da_instituicao"]}
                sx={{ width: "100%" }}
            />
            </>
            <><SelectSearchComponent inputLabel='Cargo Ocupado'
                id={styles["cargo_ocupado"]}
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
                defaulOption={(() => {
                    let desc = props.experiencia?.cargo;
                    let id = props.experiencia?.cargoID;

                    if (desc && id) {
                        return [{
                            "desc": desc,
                            "id": id
                        }]
                    }
                })()}
                inputRefDesc={props.refsMap.get("cargo")}
                inputRefID={props.refsMap.get("cargoID")}
            />
            </>
            <><SelectSearchComponent inputLabel='Área de Atuação'
                id={styles["area_de_atuacao"]}
                sx={{ width: "100%" }}
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
                defaulOption={(() => {
                    let desc = props.experiencia?.areaAtuacao;
                    let id = props.experiencia?.areaAtuacaoID;

                    if (desc && id) {
                        return [{
                            "desc": desc,
                            "id": id
                        }]
                    }
                })()}
                inputRefDesc={props.refsMap.get("areaAtuacao")}
                inputRefID={props.refsMap.get("areaAtuacaoID")}

            />
            </>
            <><DateField label='Data de início'
                id={styles["data_inicio"]}
                sx={{ width: "100%" }}
                value={props.experiencia?.dataInicio}
                inputRef={props.refsMap.get("dataInicio")}
            />
            </>
            <><DateField label='Data Fim'
                id={styles["data_fim"]}
                sx={{ width: "100%" }}
                value={props.experiencia?.dataFim ?? undefined}
                inputRef={props.refsMap.get("dataFim")}
            />
            </>
            <><TextFieldComponent label='Descrição das Atividades Realizadas'
                id={styles["descricao_das_atividades_realizadas"]}
                sx={{ width: "100%", height: "100%" }}
                multiline={{ rows: 4 }}
                value={props.experiencia?.descricao}
                inputRef={props.refsMap.get("descricao")}
            />
            </>
            <><SelectComponent inputLabel='Regime de contratação'
                id={styles["regime_de_contratacao"]}
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
                defaulOption={(() => {
                    let value = props.experiencia?.regimeContratacao;
                    if (value) {
                        return [{
                            "desc": value,
                            "id": value
                        }]
                    }
                })()}
                inputRefDesc={props.refsMap.get("regimeContratacao")}
            />
            </>
            <><TextFieldComponent label='Carga Horária Semanal'
                id={styles["carga_horaria_semanal"]}
                sx={{ width: "100%" }}
                type="number"
                value={props.experiencia?.cargaHoraria}
                inputRef={props.refsMap.get("cargaHoraria")}
            />
            </>
            <><TextFieldComponent label='Salário ou Remuneração Recebida'
                id={styles["salario_ou_remuneracao_recebida"]}
                sx={{ width: "100%" }}
                type="monetary"
                value={props.experiencia?.salario}
                inputRef={props.refsMap.get("salario")}
            />
            </>
        </div>
    )
}

export default CadastroExperiencias;