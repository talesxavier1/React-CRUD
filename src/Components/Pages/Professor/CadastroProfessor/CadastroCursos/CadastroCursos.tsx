import styles from "./CadastroCursos.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { MutableRefObject, useCallback, useContext, useMemo, useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";
import DateField from "../../../../Components/DateField/DateField";
import SelectComponent from "../../../../Components/Select/SelectComponent";
import CursoModel from "../../../../../Models/Objects/CursoModel";
import Grid from "../../../../Components/Grid/Grid";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import DateFormat from "../../../../../utils/DateFormat";
import RefFormatter from "../../../../../utils/RefFormatter";
import { ProfessorContext } from "../../ProfessorContext";
import { useQuery } from "react-query";
import { GUID } from "../../../../../utils/GUID";
import Swal from "sweetalert2";

interface ICadastroCursos {
    id: string
}

const CadastroCursos = (props: ICadastroCursos) => {
    const professorContext = useContext(ProfessorContext);
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: CursoModel }>({ isOpen: false, content: undefined });
    const [gridPage, setGridPage] = useState<number>(0);

    const propriedadesColunas: GridColDef[] = useMemo((): GridColDef[] => {
        return [
            { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
            { field: 'courseName', headerName: 'Nome do Curso', width: 300, sortable: false },
            { field: 'educationalInstitution', headerName: 'Instituição de Ensino', width: 250, sortable: false, filterable: true },
            { field: 'courseLoad', headerName: 'Carga Horária', width: 150, sortable: false, filterable: true },
            {
                field: 'startDate',
                headerName: 'Data de Início',
                width: 150,
                sortable: false,
                valueFormatter: (value) => {
                    if (!value.value) { return "" }
                    return DateFormat.formatDate({ format: "DD/MM/YYYY", isoDate: value.value })
                }
            },
            {
                field: 'endDate',
                type: 'date',
                headerName: 'Data de Fim',
                width: 150,
                sortable: false,
                valueFormatter: (value) => {
                    if (!value.value) { return "" }
                    return DateFormat.formatDate({ format: "DD/MM/YYYY", isoDate: value.value })
                }
            },
            { field: 'modality', headerName: 'Modalidade', width: 150, sortable: false },
            { field: 'financialInvestment', headerName: 'Investimento R$', width: 150, sortable: false }
        ];
    }, []);
    let refsMap = RefFormatter.generateObjectRefs(new CursoModel(), ["codigoRef"]);

    const { isFetching: cusrosIsFetching, refetch: cursosRefetch } = useQuery(
        ["cursos", professorContext?.professor?.codigo, gridPage],
        (async () => {
            let result = await professorContext?.getCursos(gridPage * 5, 5, professorContext?.professor?.codigo);
            let resultCount = await professorContext?.countCursos(professorContext?.professor?.codigo);

            professorContext?.setCursos({
                count: resultCount ?? 0,
                cursos: result ?? []
            });
            return
        }),
        { refetchOnWindowFocus: false, cacheTime: 0, enabled: !!professorContext?.professor?.codigo }
    );

    const saveCurso = useCallback(async () => {
        let curso: CursoModel = RefFormatter.getObjectFromRefs(new CursoModel(), refsMap);

        curso.codigoRef = professorContext?.professor?.codigo ?? "";
        curso.courseLoad = curso.courseLoad ? Number(curso.courseLoad) : 0;
        curso.endDate = curso.endDate ? DateFormat.getISODateFromBRDate(curso.endDate) : null;
        curso.startDate = curso.startDate ? DateFormat.getISODateFromBRDate(curso.startDate) : null;
        curso.financialInvestment = curso.financialInvestment ? Number(curso.financialInvestment) : 0;

        let result;
        if (professorContext?.cursos?.cursos.find(VALUE => VALUE.codigo == curso.codigo)) {
            result = await professorContext?.alterarCurso(curso);
        } else {
            result = await professorContext?.addCurso(curso);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalProps({ isOpen: false, content: undefined });
                cursosRefetch();
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }
    }, [refsMap, professorContext]);

    const deleteCurso = useCallback(async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await professorContext?.deleteCurso(VALUE.toString());
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
            cursosRefetch();
        });
    }, [professorContext, selectedRows]);

    return (
        <div className={styles["container"]} id={props.id}>
            <div className={styles["buttons-container"]}>
                <><ModalComponent
                    modalAberto={modalProps.isOpen}
                    closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                    content={<Content refsMap={refsMap} curso={modalProps.content} />}
                    btnSaveAction={saveCurso}
                />
                </>
                <><ButtonComponent value='Adicionar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#539553'
                    }}
                    onClick={() => { setModalProps({ isOpen: true, content: undefined }) }}
                />
                </>
                <><ButtonComponent value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { setModalProps({ isOpen: true, content: (professorContext?.cursos?.cursos ?? []).find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
                    disabled={selectedRows.length != 1}
                />
                </>
                <><ButtonComponent value='Excluir'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`
                    }}
                    disabled={selectedRows.length == 0}
                    onClick={deleteCurso}
                />
                </>
            </div>
            <div className={styles["grid_container"]}>
                <Grid
                    loading={cusrosIsFetching}
                    linhasGrid={professorContext?.cursos?.cursos ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={professorContext?.cursos?.count ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </div>
    );
}

const Content = (props: { curso?: CursoModel, refsMap: Map<string, MutableRefObject<any>> }) => {
    return (
        <div className={styles["content_container"]}>
            <><TextFieldComponent label='Código'
                readonly
                inputRef={props.refsMap.get("codigo")}
                value={props.curso?.codigo ?? GUID.getGUID()}
                id={styles["codigo"]}
                sx={{ width: "330px" }}
            />
            </>
            <><TextFieldComponent label='Nome do Curso'
                inputRef={props.refsMap.get("courseName")}
                value={props.curso?.courseName ?? ""}
                id={styles["nome_do_curso"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Instituição de Ensino'
                inputRef={props.refsMap.get("educationalInstitution")}
                value={props.curso?.educationalInstitution ?? ""}
                id={styles["instituicao_de_ensino"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Carga Horária'
                inputRef={props.refsMap.get("courseLoad")}
                value={props.curso?.courseLoad ?? 0}
                id={styles["carga_horaria"]}
                sx={{ width: "100%" }}
                type="number"
            />
            </>
            <><DateField label='Data de Início'
                inputRef={props.refsMap.get("startDate")}
                value={props.curso?.startDate ?? ""}
                id={styles["data_de_inicio"]}
                sx={{ width: "100%" }}
            />
            </>
            <><DateField label='Data de Fim'
                inputRef={props.refsMap.get("endDate")}
                value={props.curso?.endDate ?? ""}
                id={styles["data_de_fim"]}
                sx={{ width: "100%" }}
            />
            </>
            <><SelectComponent inputLabel='Modalidade do Curso'
                inputRefDesc={props.refsMap.get("modality")}
                defaulOption={(() => {
                    let value = props.curso?.modality;
                    if (value) {
                        return [{
                            "desc": value,
                            "id": value
                        }]
                    }
                })()}
                id={styles["modalidade_do_curso"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                options={[
                    { "desc": "Presencial", "id": "Presencial" },
                    { "desc": "Semipresencial", "id": "Semipresencial" },
                    { "desc": "Ensino a Distância", "id": "Ensino a Distância" },
                ]}
            />
            </>
            <><TextFieldComponent label='Investimento Financeiro'
                inputRef={props.refsMap.get("financialInvestment")}
                value={props.curso?.financialInvestment ?? 0}
                id={styles["investimento_financeiro"]}
                sx={{ width: "100%" }}
                type="monetary"
            />
            </>
            <><TextFieldComponent label='Descrição do Curso'
                inputRef={props.refsMap.get("descriptions")}
                value={props.curso?.descriptions ?? ""}
                id={styles["descricao_do_curso"]}
                sx={{ width: "100%" }}
                multiline={{ rows: 4 }}
            />
            </>
        </div>
    )
}

export default CadastroCursos;
