import { useState } from "react"
import CargosModel from "../../../../../Models/Objects/CargosModel"
import { GUID } from "../../../../../utils/GUID"
import RefFormatter from "../../../../../utils/RefFormatter"
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent"
import styles from "./Cargos.module.css"
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid"
import ModalComponent from "../../../../Components/Modal/ModalComponent"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import Grid from "../../../../Components/Grid/Grid"
import CargoRepository from "../../../../../Repository/Implementations/CargoRepository"
import { useQuery } from "react-query"
import Swal from "sweetalert2"

const Cargos = () => {

    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const [cargos, setCargos] = useState<CargosModel[]>([]);
    const userToken = sessionStorage.getItem("userToken") ?? "";
    let refsMap = RefFormatter.generateObjectRefs(new CargosModel(), []);
    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: CargosModel }>({ isOpen: false, content: undefined });

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'position', headerName: 'Cargo', width: 300, sortable: false },
    ];

    const { isFetching: cargosIsFetching, refetch: cargosAtuacaoRefetch } = useQuery(
        ["cargos", gridPage],
        (async () => {
            let result = await new CargoRepository().getPositions(userToken, gridPage * 5, 5);
            setCargos(result);
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const { data: cargosAtuacaoCount, refetch: cargosAtuacaoCountRefetc } = useQuery(
        ["cargosCount", gridPage],
        (async () => {
            let result = new CargoRepository().countPositions(userToken);
            return result;
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const saveCargo = async () => {
        let cargo: CargosModel = RefFormatter.getObjectFromRefs(new CargosModel(), refsMap);

        let result;
        if (cargos.find(VALUE => VALUE.codigo == cargo.codigo)) {
            result = await new CargoRepository().modifyPosition(userToken, cargo);
        } else {
            result = await new CargoRepository().addPosition(userToken, cargo)
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalProps({ isOpen: false, content: undefined });
                cargosAtuacaoRefetch();
                cargosAtuacaoCountRefetc();
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }
    }

    const deleteAreaAtuacao = async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await new CargoRepository().logicalDeletePosition(userToken, VALUE.toString());
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
            cargosAtuacaoRefetch();
            cargosAtuacaoCountRefetc();
        });
    }

    return (
        <>
            <ModalComponent
                btnSaveAction={saveCargo}
                modalAberto={modalProps.isOpen}
                closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                content={<CargoContent refs={refsMap} content={modalProps.content} />}
            />
            <div className={styles["buttons_area"]}>
                <ButtonComponent
                    value='Adicionar'
                    variant='outlined'
                    style={{ color: '#222834', backgroundColor: '#539553' }}
                    onClick={() => { setModalProps({ isOpen: true, content: undefined }) }}
                />
                <ButtonComponent
                    value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={() => { setModalProps({ isOpen: true, content: cargos.find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
                    disabled={selectedRows.length != 1}
                />
                <ButtonComponent
                    value='Excluir'
                    variant='outlined'
                    onClick={deleteAreaAtuacao}
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length > 0 ? "#ff6868" : ""}`
                    }}
                    disabled={selectedRows.length == 0}
                />
            </div >
            <div className={styles["grid_container"]}>
                <Grid
                    loading={cargosIsFetching}
                    linhasGrid={cargos ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={cargosAtuacaoCount ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </>
    )
}

interface IFormacaoAcademicaContent {
    content?: CargosModel
    refs: Map<string, React.MutableRefObject<any>>
}

const CargoContent = (props: IFormacaoAcademicaContent) => {

    return (
        <>
            <TextFieldComponent readonly id={styles["codigo"]} value={props.content?.codigo ?? GUID.getGUID()} inputRef={props.refs.get("codigo")} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent id={styles["cargo"]} inputRef={props.refs.get("position")} sx={{ width: "100%" }} value={props.content?.position ?? ""} label='Cargo' />
        </>
    )
}

export default Cargos;