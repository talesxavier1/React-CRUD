import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { GUID } from "../../../../../../utils/GUID";
import ButtonComponent from "../../../../../Components/Button/ButtonComponent";
import Grid from "../../../../../Components/Grid/Grid";
import ModalComponent from "../../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../../Components/TextField/TextFieldComponent";
import style from "./AreaConhecimento.module.css"
import { useState } from "react";
import AreaConhecimentoModel from "../../../../../../Models/Objects/AreaConhecimentoModel";
import RefFormatter from "../../../../../../utils/RefFormatter";
import { useQuery } from "react-query";
import AreaConhecimentoRepository from "../../../../../../Repository/Implementations/AreaConhecimentoRepository";
import Swal from "sweetalert2";


const AreaConhecimento = () => {
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const [areas, setAreas] = useState<{ values: AreaConhecimentoModel[], count: number }>({ values: [], count: 0 });
    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: AreaConhecimentoModel }>({ isOpen: false, content: undefined });
    let refsMap = RefFormatter.generateObjectRefs(new AreaConhecimentoModel(), []);
    const userToken = sessionStorage.getItem("userToken") ?? "";

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'area', headerName: 'Área', width: 300, sortable: false },
    ];

    const { isFetching, refetch } = useQuery(
        ["AreaConhecimento", gridPage],
        (async () => {
            let values = await new AreaConhecimentoRepository().getKnowledgeAreas(userToken, gridPage * 5, 5);
            let count = await new AreaConhecimentoRepository().countKnowledgeAreas(userToken);
            setAreas({
                values: values,
                count: count
            });
        }),
        { refetchOnWindowFocus: false }
    );

    const saveArea = async () => {
        let componente = RefFormatter.getObjectFromRefs(new AreaConhecimentoModel, refsMap);

        let result;
        if (areas.values.find(VALUE => VALUE.codigo == componente.codigo)) {
            result = await new AreaConhecimentoRepository().modifyKnowledgeArea(userToken, componente);
        } else {
            result = await new AreaConhecimentoRepository().addKnowledgeArea(userToken, componente);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalProps({ isOpen: false, content: undefined });
                refetch();
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
            let result = await new AreaConhecimentoRepository().logicalDeleteKnowledgeArea(userToken, VALUE.toString());
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
            refetch();
        });
    }

    return (
        <>
            <ModalComponent
                btnSaveAction={saveArea}
                modalAberto={modalProps.isOpen}
                closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                content={<Content refs={refsMap} content={modalProps.content} />}
            />
            <div className={style["buttons_area"]}>
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
                    onClick={() => { setModalProps({ isOpen: true, content: areas.values.find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
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
            <div className={style["grid_container"]}>
                <Grid
                    loading={isFetching}
                    linhasGrid={areas.values}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={areas.count}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </>
    )
}

const Content = (props: { content?: AreaConhecimentoModel, refs: Map<string, React.MutableRefObject<any>> }) => {
    return (
        <div className={style["fields-container"]}>
            <TextFieldComponent readonly id={style["codigo"]} value={props.content?.codigo ?? GUID.getGUID()} inputRef={props.refs.get("codigo")} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent id={style["area"]} inputRef={props.refs.get("area")} sx={{ width: "100%" }} value={props.content?.area ?? ""} label='Área' />
        </div>
    )
}


export default AreaConhecimento;