import { useState } from "react";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import styles from "./AreaAtuacao.module.css"
import AreaAtuacaoModel from "../../../../Models/Objects/AreaAtuacaoModel";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import ModalComponent from "../../../Components/Modal/ModalComponent";
import Grid from "../../../Components/Grid/Grid";
import TextFieldComponent from "../../../Components/TextField/TextFieldComponent";
import RefFormatter from "../../../../utils/RefFormatter";
import { GUID } from "../../../../utils/GUID";

interface ImodalProps {
    modalAberto: boolean
    content?: AreaAtuacaoModel
}

const AreaAtuacao = () => {

    const [modalProps, setModalProps] = useState<ImodalProps>({
        "modalAberto": false,
        "content": undefined
    });

    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    let refsMap = RefFormatter.generateObjectRefs(new AreaAtuacaoModel(), []);


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
        { field: 'area', headerName: 'Área de Atuação', width: 300, sortable: false },
    ];

    const values: AreaAtuacaoModel[] = [
        { "codigo": "308a10ab-0106-4141-89ce-1365333fbb6b", "area": "Língua Portuguesa" },
        { "codigo": "380ac1e3-740a-49bd-aafa-8ac62110dc95", "area": "Língua Inglesa" },
        { "codigo": "4b94fc29-0b2a-49fd-8d56-2f587d5fd23f", "area": "Matemática" },
        { "codigo": "74fa595c-2549-4d85-b397-834ae538b5bf", "area": "Biologia" },
        { "codigo": "97e2a1a7-ed33-4b32-af22-22e107380df6", "area": "Física" },
        { "codigo": "ff782057-19ce-41ce-89e5-d122f0f10986", "area": "Química" },
        { "codigo": "fcb19ee7-fa4c-4537-989e-887fada655d3", "area": "Geografia" },
        { "codigo": "95765a9b-62f6-4af3-8fa2-e66fcd3f8ef2", "area": "História" },
        { "codigo": "7cc8cff5-944a-4e3b-878d-e1150d9f5e20", "area": "Sociologia" },
        { "codigo": "97eada93-8e0e-4854-af3a-1e73a5670de1", "area": "Filosofia" },
        { "codigo": "bfcd0f16-f71c-4f33-984c-1a7a86e37cb1", "area": "Artes" },
        { "codigo": "2785811e-0ed0-4796-b49b-a87ce9a80d70", "area": "Educação Física" },
        { "codigo": "72af97d0-9b14-4e4a-8e45-d52a3571e1ff", "area": "Pedagogia" },
        { "codigo": "ec3d5c18-1731-4de5-9a28-c205dc8e4aa1", "area": "Informática" },
        { "codigo": "5fc5018f-a109-4b02-8b1d-ebd944718632", "area": "Engenharia" },
        { "codigo": "5df3366a-d069-45be-8099-bcd27dce294c", "area": "Medicina" },
        { "codigo": "943955b8-e2d7-402b-824f-333984c597fb", "area": "Psicologia" },
        { "codigo": "90ad2b52-2ced-44d5-96aa-e6d522e0e476", "area": "Direito" },
        { "codigo": "ac059aea-addd-4439-83bb-83fbb3426cb4", "area": "Administração" },
        { "codigo": "f5263923-a914-4474-82db-f1f254730fd2", "area": "Contabilidade" },
        { "codigo": "0ce6f869-f063-42ef-82ae-a71fe1492ba6", "area": "Marketing" },
        { "codigo": "dc07b16f-f01d-4092-a599-db06b5c29dd7", "area": "Finanças" },
        { "codigo": "24e9cbd3-406e-4308-b08a-de2af01ded5a", "area": "Recursos Humanos" },
        { "codigo": "8b3761a8-ff12-45c5-adc7-393222ba2de5", "area": "Relações Públicas" },
        { "codigo": "fc43a787-00df-467d-902e-d2dd5bd9be85", "area": "Comunicação Social" },
        { "codigo": "cb522486-d68d-45a4-8644-158d11834dc3", "area": "Design" },
        { "codigo": "f94fd4c1-2a3f-4857-8385-6ae16de902b9", "area": "Moda" },
        { "codigo": "d02f578d-92f9-45ab-9a93-ffb110eba2e8", "area": "Gastronomia" },
        { "codigo": "f66c1870-bd6b-4076-9ea0-bbeef872c878", "area": "Turismo" },
        { "codigo": "fb519557-ded9-47e0-bf00-41494de1d357", "area": "Hotelaria" },
        { "codigo": "eac223da-2402-4e78-8df4-35602f73aa6b", "area": "Outros" }
    ];

    return (
        <>
            <ModalComponent
                btnSaveAction={() => { }}
                modalAberto={modalProps.modalAberto}
                closeOpenModal={callBackModal}
                content={<AreaAtuacaoContent refs={refsMap} content={modalProps.content} />}
            />
            <div className={styles["buttons_area"]}>
                <ButtonComponent
                    value='Adicionar'
                    variant='outlined'
                    style={{ color: '#222834', backgroundColor: '#539553' }}
                    onClick={callBackModal}
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
                />
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
            </div >
        </>
    )
}

interface IFormacaoAcademicaContent {
    content?: AreaAtuacaoModel
    refs: Map<string, React.MutableRefObject<any>>
}
const AreaAtuacaoContent = (props: IFormacaoAcademicaContent) => {
    console.log(props);
    return (
        <div className={styles["fields-container"]}>
            <TextFieldComponent readonly id={styles["codigo"]} value={props.content?.codigo ?? GUID.getGUID()} inputRef={props.refs.get("codigo")} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent id={styles["formacao"]} inputRef={props.refs.get("formacao")} sx={{ width: "100%" }} value={props.content?.area ?? ""} label='Área de Atuação' />
        </div>
    );
}

export default AreaAtuacao;