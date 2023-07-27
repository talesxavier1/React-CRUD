import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import ButtonComponent from "../../../../../Components/Button/ButtonComponent"
import Grid from "../../../../../Components/Grid/Grid";
import styles from "./ComponentesCurriculares.module.css"
import { useState } from "react";
import { TurmaComponenteCurricularModel } from "../../../../../../Models/Objects/TurmaComponenteCurricularModel";
import { useQuery } from "react-query";
import { TurmaComponenteCurricularRepository } from "../../../../../../Repository/Implementations/TurmaComponenteCurricularRepository";
import TextFieldComponent from "../../../../../Components/TextField/TextFieldComponent";
import { GUID } from "../../../../../../utils/GUID";
import ModalComponent from "../../../../../Components/Modal/ModalComponent";
import RefFormatter from "../../../../../../utils/RefFormatter";
import Swal from "sweetalert2";


const ComponentesCurriculares = () => {
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);

    const [componentes, SetComponentes] = useState<{ values: TurmaComponenteCurricularModel[], count: number }>({ values: [], count: 0 });

    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: TurmaComponenteCurricularModel }>({ isOpen: false, content: undefined });
    let refsMap = RefFormatter.generateObjectRefs(new TurmaComponenteCurricularModel(), []);
    const userToken = sessionStorage.getItem("userToken") ?? "";

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'component', headerName: 'Componente', width: 300, sortable: false },
    ];

    const { isFetching: turmaComponentesIsFetching, refetch: turmaComponentesRefetch } = useQuery(
        ["turma_componentes", gridPage],
        (async () => {
            let values = await new TurmaComponenteCurricularRepository().getCurricularComponents(userToken, gridPage * 5, 5);
            let count = await new TurmaComponenteCurricularRepository().countCurricularComponents(userToken);
            SetComponentes({
                values: values,
                count: count
            });
        }),
        { refetchOnWindowFocus: false }
    );

    const saveComponente = async () => {
        let componente = RefFormatter.getObjectFromRefs(new TurmaComponenteCurricularModel, refsMap);

        let result;
        if (componentes.values.find(VALUE => VALUE.codigo == componente.codigo)) {
            result = await new TurmaComponenteCurricularRepository().modifyCurricularComponent(userToken, componente);
        } else {
            result = await new TurmaComponenteCurricularRepository().addCurricularComponent(userToken, componente);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalProps({ isOpen: false, content: undefined });
                turmaComponentesRefetch();
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }
    }

    const deleteComponente = async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await new TurmaComponenteCurricularRepository().logicalDeleteCurricularComponent(userToken, VALUE.toString());
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
            turmaComponentesRefetch();
        });
    }

    return (
        <>
            <ModalComponent
                btnSaveAction={saveComponente}
                modalAberto={modalProps.isOpen}
                closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                content={<Content refs={refsMap} content={modalProps.content} />}
            />
            <div className={styles["buttons_area"]}>
                <ButtonComponent
                    value='Adicionar'
                    variant='outlined'
                    style={{ color: '#222834', backgroundColor: '#539553' }}
                    onClick={() => {
                        setModalProps({ isOpen: true, content: undefined })
                    }}
                />
                <ButtonComponent
                    value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { setModalProps({ isOpen: true, content: componentes.values.find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
                    disabled={selectedRows.length != 1}
                />
                <ButtonComponent
                    value='Excluir'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`
                    }}
                    disabled={selectedRows.length == 0}
                    onClick={deleteComponente}
                />
            </div >
            <div className={styles["grid_container"]}>
                <Grid
                    loading={turmaComponentesIsFetching}
                    linhasGrid={componentes.values}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={componentes.count}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </>
    )

}


const Content = (props: { content?: TurmaComponenteCurricularModel, refs: Map<string, React.MutableRefObject<any>> }) => {
    return (
        <div className={styles["fields-container"]}>
            <TextFieldComponent readonly id={styles["codigo"]} value={props.content?.codigo ?? GUID.getGUID()} inputRef={props.refs.get("codigo")} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent id={styles["area"]} inputRef={props.refs.get("component")} sx={{ width: "100%" }} value={props.content?.component ?? ""} label='Componente' />
        </div>
    )
}

export default ComponentesCurriculares;


