import { useState } from "react"
import CargosModel from "../../../../Models/Objects/CargosModel"
import { GUID } from "../../../../utils/GUID"
import RefFormatter from "../../../../utils/RefFormatter"
import TextFieldComponent from "../../../Components/TextField/TextFieldComponent"
import styles from "./Cargos.module.css"
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid"
import ModalComponent from "../../../Components/Modal/ModalComponent"
import ButtonComponent from "../../../Components/Button/ButtonComponent"
import Grid from "../../../Components/Grid/Grid"

interface ImodalProps {
    modalAberto: boolean
    content?: CargosModel
}

const Cargos = () => {

    const [modalProps, setModalProps] = useState<ImodalProps>({
        "modalAberto": false,
        "content": undefined
    });

    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    let refsMap = RefFormatter.generateObjectRefs(new CargosModel(), []);

    const callBackModal = () => {
        if (modalProps.modalAberto) {
            setModalProps({
                modalAberto: false,
                content: undefined
            });
        } else {
            setModalProps({
                modalAberto: true,
                content: (() => {
                    if (selectedRows.length == 1) {
                        return values.find(VALUE => VALUE.codigo == selectedRows[0]);
                    }
                })()
            });
        }
    };

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'cargo', headerName: 'Cargo', width: 300, sortable: false },
    ];

    const values: CargosModel[] = [
        { codigo: "5930f9ad-64ff-4220-a087-398799e44af3", cargo: "Analista" },
        { codigo: "56dccc9f-f669-48fc-85c2-aa07932f28f0", cargo: "Coordenador" },
        { codigo: "3c3ea1ee-ae11-4710-84d3-a3da4f76a0e8", cargo: "Gerente" },
        { codigo: "41af2720-3fca-4a56-bfe9-ca5166a20295", cargo: "Diretor" },
        { codigo: "cb30d849-8b8b-4fba-9fb1-992ee2b575b7", cargo: "Supervisor" },
        { codigo: "8a682434-3018-41da-8fb3-bab557ac10d7", cargo: "Consultor" },
        { codigo: "55abaad2-5c15-4819-8e8d-60c15925c6a4", cargo: "Especialista" },
        { codigo: "22d8d14c-ddfc-4716-828c-f943cbc42232", cargo: "Desenvolvedor" },
        { codigo: "8dab0e13-9d50-4e15-88d4-70e4fc591b29", cargo: "Programador" },
        { codigo: "b28cb4e3-5825-44c2-8205-f6ef205a01a3", cargo: "Designer" },
        { codigo: "3cd3bf3e-3a50-47d8-b727-4e54a9cc509f", cargo: "Professor" },
        { codigo: "d2b1f675-288e-4f19-82d3-584172c54baa", cargo: "Pesquisador" },
        { codigo: "1ace7812-714d-42ff-a5f8-461d272be9da", cargo: "Técnico" },
        { codigo: "f1257e6a-b22d-4374-8544-230ec766721b", cargo: "Auxiliar" },
        { codigo: "bc6cab3b-cd79-44f9-a692-3b7044a91a12", cargo: "Estagiário" },
        { codigo: "21ee157b-7391-4a96-864e-412d2a0a6c9f", cargo: "Trainee" },
        { codigo: "ce98583d-e4a9-4aaa-8dde-41d30db9bd1b", cargo: "Outros" }
    ];

    const saveCargo = async () => {
        let teste = RefFormatter.getObjectFromRefs(new CargosModel(), refsMap);
    }

    return (
        <>
            <ModalComponent
                btnSaveAction={saveCargo}
                modalAberto={modalProps.modalAberto}
                closeOpenModal={callBackModal}
                content={<CargoContent refs={refsMap} content={modalProps.content} />}
            />
            <div className={styles["buttons_area"]}>
                <ButtonComponent
                    value='Adicionar'
                    variant='outlined'
                    style={{ color: '#222834', backgroundColor: '#539553' }}
                    onClick={() => {
                        setModalProps({ modalAberto: true, content: undefined })
                    }}
                />
                <ButtonComponent
                    value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                    onClick={callBackModal}
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
                />
            </div >
            <div className={styles["grid_area"]}>
                <Grid
                    loading={false}
                    linhasGrid={values ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={0}
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
            <TextFieldComponent id={styles["cargo"]} inputRef={props.refs.get("cargo")} sx={{ width: "100%" }} value={props.content?.cargo ?? ""} label='Cargo' />
        </>
    )
}

export default Cargos;