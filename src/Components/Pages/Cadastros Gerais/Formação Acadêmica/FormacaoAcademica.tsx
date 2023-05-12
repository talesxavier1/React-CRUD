import styles from './FormacaoAcademica.module.css'
import TextFieldComponent from "../../../Components/TextField/TextFieldComponent";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import ModalComponent from "../../../Components/Modal/ModalComponent";
import { useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import Grid from "../../../Components/Grid/Grid";
import FormacaoModel from "../../../../Models/Objects/FormacaoModel";
import { GUID } from "../../../../utils/GUID";
import RefFormatter from "../../../../utils/RefFormatter";


interface ImodalProps {
    modalAberto: boolean
    content?: FormacaoModel
}


const FormacaoAcademica = () => {

    const [modalProps, setModalProps] = useState<ImodalProps>({
        "modalAberto": false,
        "content": undefined
    });

    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    let refsMap = RefFormatter.generateObjectRefs(new FormacaoModel(), []);

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
        { field: 'formacao', headerName: 'Formação', width: 300, sortable: false },
    ];

    const values: FormacaoModel[] = [
        { codigo: "c97a357f-374f-4672-8c3b-600fada86696", formacao: "Graduação em Letras" },
        { codigo: "2e20e5b7-0920-4148-97ae-a8e625d791b4", formacao: "Graduação em Matemática" },
        { codigo: "ba781248-0da7-4eb1-9cc9-018c466cd15a", formacao: "Graduação em Ciências Biológicas" },
        { codigo: "5f50eab0-f054-4be0-80c7-6c08f6084ed3", formacao: "Graduação em Educação Física" },
        { codigo: "a56af78d-e7c2-46a3-b48e-0f954201bf50", formacao: "Graduação em História" },
        { codigo: "2ae66e5e-2719-4a48-98ff-0989abdb25c8", formacao: "Graduação em Geografia" },
        { codigo: "bc8d8e0e-df87-4dd1-81c6-d14e29853fc3", formacao: "Graduação em Física" },
        { codigo: "cb4279de-2f74-45df-9d73-e03dfbfc255d", formacao: "Graduação em Química" },
        { codigo: "23e4c915-68d8-4a2a-8569-db901f3dde7b", formacao: "Graduação em Pedagogia" },
        { codigo: "0f6f94e9-656e-45d2-8c14-0c2e4009cb35", formacao: "Graduação em Filosofia" },
        { codigo: "2d469f5b-c95e-429d-a537-98c9881e1084", formacao: "Graduação em Artes" },
        { codigo: "046120e2-6266-4062-a0aa-78b8aa07a2c6", formacao: "Graduação em Engenharia" },
        { codigo: "10cd5a50-fad2-425b-bb2e-8c54442d056f", formacao: "Mestrado em Educação" },
        { codigo: "0b61d3d2-642c-4dc7-b762-107d866017a3", formacao: "Mestrado em Linguística" },
        { codigo: "6d630685-31d3-46ff-8763-56336058b9bb", formacao: "Mestrado em Matemática" },
        { codigo: "197177f4-416d-4bfe-bf14-77275e36e64c", formacao: "Mestrado em Biologia" },
        { codigo: "5875163c-db10-4565-b43c-261c585e196a", formacao: "Mestrado em História" },
        { codigo: "b346456d-becd-4277-b1f8-bc85e8d4b25c", formacao: "Mestrado em Geografia" },
        { codigo: "403c44d3-d130-41a1-88fc-f49cbe22f875", formacao: "Mestrado em Física" },
        { codigo: "063f1686-60b0-47a5-ace1-7f58f8a7e984", formacao: "Mestrado em Química" },
        { codigo: "0818962d-d819-4004-b309-6d163413d047", formacao: "Doutorado em Educação" },
        { codigo: "cecc09ad-3086-4c1c-a6f7-f7880f7fc013", formacao: "Doutorado em Linguística" },
        { codigo: "68b89c49-1111-4f58-963b-b5da2f6a7dda", formacao: "Doutorado em Matemática" },
        { codigo: "82d01112-0fad-4fe8-81cf-882fca447371", formacao: "Doutorado em Biologia" },
        { codigo: "6e89d01a-7324-4b58-962d-8751091bb27a", formacao: "Doutorado em História" },
        { codigo: "52be0123-466f-4658-af9a-4f6fe318fb08", formacao: "Doutorado em Geografia" },
        { codigo: "d85ba557-06b7-45c4-8270-abcacc0013c3", formacao: "Doutorado em Física" },
        { codigo: "0b6f0160-f0f9-46e3-a2cb-5b8d71c607a4", formacao: "Doutorado em Química" },
    ];

    const saveFormcao = async () => {
        let teste = RefFormatter.getObjectFromRefs(new FormacaoModel(), refsMap);
    }

    return (
        <>
            <ModalComponent
                btnSaveAction={saveFormcao}
                modalAberto={modalProps.modalAberto}
                closeOpenModal={callBackModal}
                content={<FormacaoAcademicaContent refs={refsMap} content={modalProps.content} />}
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
    content?: FormacaoModel
    refs: Map<string, React.MutableRefObject<any>>
}

const FormacaoAcademicaContent = (props: IFormacaoAcademicaContent) => {
    return (
        <>
            <TextFieldComponent readonly id={styles["codigo"]} value={props.content?.codigo ?? GUID.getGUID()} inputRef={props.refs.get("codigo")} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent id={styles["formacao"]} inputRef={props.refs.get("formacao")} sx={{ width: "100%" }} value={props.content?.formacao ?? ""} label='Formação' />
        </>
    )
}

export default FormacaoAcademica;

