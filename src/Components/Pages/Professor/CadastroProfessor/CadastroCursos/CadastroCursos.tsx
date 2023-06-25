import styles from "./CadastroCursos.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { MutableRefObject, useMemo, useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";
import DateField from "../../../../Components/DateField/DateField";
import SelectComponent from "../../../../Components/Select/SelectComponent";
import CursoModel from "../../../../../Models/Objects/CursoModel";
import Grid from "../../../../Components/Grid/Grid";
import { GridColDef } from "@mui/x-data-grid";
import DateFormat from "../../../../../utils/DateFormat";
import RefFormatter from "../../../../../utils/RefFormatter";

interface ICadastroCursos {
    id: string
}

const CadastroCursos = (props: ICadastroCursos) => {
    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: CursoModel }>({ isOpen: false, content: undefined });
    const [gridPage, setGridPage] = useState<number>(0);

    const propriedadesColunas: GridColDef[] = useMemo((): GridColDef[] => {
        return [
            { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
            { field: 'courseName', headerName: 'Nome do Curso', width: 300, sortable: false },
            { field: 'educationalInstitution', headerName: 'Instituição de Ensino', width: 250, sortable: false },
            { field: 'courseLoad', headerName: 'Carga Horária', width: 150, sortable: false },
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
            { field: 'financialInvestment', headerName: 'Investimento', width: 150, sortable: false }
        ];
    }, []);
    let refsMap = RefFormatter.generateObjectRefs(new CursoModel(), ["codigoRef"]);

    return (
        <div className={styles["container"]} id={props.id}>
            <div className={styles["buttons-container"]}>
                <><ModalComponent
                    modalAberto={modalProps.isOpen}
                    closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                    content={<Content refsMap={refsMap} curso={modalProps.content} />}
                    btnSaveAction={() => { }}
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
                        // backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                // onClick={() => { setModalAdicionar({ modalaberto: true, conteudoModal: (pessoaContext?.enderecos ?? []).find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
                // disabled={selectedRows.length != 1}
                />
                </>
                <><ButtonComponent value='Excluir'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        // backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`
                    }}
                // disabled={selectedRows.length == 0}
                // onClick={() => { deleteEndereco() }}
                />
                </>
            </div>
            <div className={styles["grid_container__TTTTT"]}>
                <Grid
                    loading={false}
                    linhasGrid={[]}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={() => { }}
                    gridSizePage={0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </div>
    )
}

const Content = (props: { curso?: CursoModel, refsMap: Map<string, MutableRefObject<any>> }) => {
    return (
        <div className={styles["content_container"]}>
            <><TextFieldComponent label='Código'
                readonly
                inputRef={props.refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["codigo"]}
                sx={{ width: "330px" }}
            />
            </>
            <><TextFieldComponent label='Nome do Curso'
                inputRef={props.refsMap.get("courseName")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["nome_do_curso"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Instituição de Ensino'
                inputRef={props.refsMap.get("educationalInstitution")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["instituicao_de_ensino"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Carga Horária'
                inputRef={props.refsMap.get("courseLoad")}
                id={styles["carga_horaria"]}
                sx={{ width: "100%" }}
                type="number"
            />
            </>
            <><DateField label='Data de Início'
                inputRef={props.refsMap.get("startDate")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_de_inicio"]}
                sx={{ width: "100%" }}
            />
            </>
            <><DateField label='Data de Fim'
                inputRef={props.refsMap.get("endDate")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_de_fim"]}
                sx={{ width: "100%" }}
            />
            </>
            <><SelectComponent inputLabel='Modalidade do Curso'
                inputRefDesc={props.refsMap.get("modality")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
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
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["investimento_financeiro"]}
                sx={{ width: "100%" }}
                type="monetary"
            />
            </>
            <><TextFieldComponent label='Descrição do Curso'
                inputRef={props.refsMap.get("descriptions")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["descricao_do_curso"]}
                sx={{ width: "100%" }}
                multiline={{ rows: 4 }}
            />
            </>
        </div>
    )
}

export default CadastroCursos;
