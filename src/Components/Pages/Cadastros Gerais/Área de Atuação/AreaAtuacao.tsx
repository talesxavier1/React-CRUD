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
import { useQuery } from "react-query";
import AreaAtuacaoRepository from "../../../../Repository/Implementations/AreaAtuacaoRepository";
import Swal from "sweetalert2";


const AreaAtuacao = () => {



    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [gridPage, setGridPage] = useState<number>(0);
    const [areasAtuacao, setAreasAtuacao] = useState<AreaAtuacaoModel[]>([])
    let refsMap = RefFormatter.generateObjectRefs(new AreaAtuacaoModel(), []);
    const userToken = sessionStorage.getItem("userToken") ?? "";

    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: AreaAtuacaoModel }>({ isOpen: false, content: undefined });

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'area', headerName: 'Área de Atuação', width: 300, sortable: false },
    ];

    const { isFetching: areasAtuacaoIsFetching, refetch: areasAtuacaoRefetch } = useQuery(
        ["areasAtuacao", gridPage],
        (async () => {
            let result = await new AreaAtuacaoRepository().getAreasOfSpecialization(userToken, gridPage * 5, 5);
            setAreasAtuacao(result);
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const { data: areaAtuacaoCount, refetch: areaAtuacaoCountRefetc } = useQuery(
        ["areaAtuacaoCount", gridPage],
        (async () => {
            let result = new AreaAtuacaoRepository().countAreaOfSpecialization(userToken);
            return result;
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const saveAreaAtuacao = async () => {
        let areaAtuacao = RefFormatter.getObjectFromRefs(new AreaAtuacaoModel, refsMap);

        let result;
        if (areasAtuacao.find(VALUE => VALUE.codigo == areaAtuacao.codigo)) {
            result = await new AreaAtuacaoRepository().modifyAreaOfSpecialization(userToken, areaAtuacao);
        } else {
            result = await new AreaAtuacaoRepository().addAreaOfSpecialization(userToken, areaAtuacao);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                setModalProps({ isOpen: false, content: undefined });
                areasAtuacaoRefetch();
                areaAtuacaoCountRefetc();
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
            let result = await new AreaAtuacaoRepository().logicalDeleteAreaOfSpecialization(userToken, VALUE.toString());
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
            areasAtuacaoRefetch();
            areaAtuacaoCountRefetc();
        });
    }

    return (
        <>
            <ModalComponent
                btnSaveAction={saveAreaAtuacao}
                modalAberto={modalProps.isOpen}
                closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                content={<AreaAtuacaoContent refs={refsMap} content={modalProps.content} />}
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
                    onClick={() => { setModalProps({ isOpen: true, content: areasAtuacao.find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
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
                    onClick={deleteAreaAtuacao}
                />
            </div >
            <div className={styles["grid_container"]}>
                <Grid
                    loading={areasAtuacaoIsFetching}
                    linhasGrid={areasAtuacao ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={areaAtuacaoCount ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </>
    )
}

interface IFormacaoAcademicaContent {
    content?: AreaAtuacaoModel
    refs: Map<string, React.MutableRefObject<any>>
}
const AreaAtuacaoContent = (props: IFormacaoAcademicaContent) => {
    return (
        <div className={styles["fields-container"]}>
            <TextFieldComponent readonly id={styles["codigo"]} value={props.content?.codigo ?? GUID.getGUID()} inputRef={props.refs.get("codigo")} sx={{ width: "330px" }} label='Código' />
            <TextFieldComponent id={styles["area"]} inputRef={props.refs.get("area")} sx={{ width: "100%" }} value={props.content?.area ?? ""} label='Área' />
        </div>
    );
}

export default AreaAtuacao;