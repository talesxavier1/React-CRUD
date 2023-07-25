import styles from './FormacaoAcademica.module.css'
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";
import ButtonComponent from "../../../../Components/Button/ButtonComponent";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import { useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import Grid from "../../../../Components/Grid/Grid";
import FormacaoModel from "../../../../../Models/Objects/FormacaoModel";
import { GUID } from "../../../../../utils/GUID";
import RefFormatter from "../../../../../utils/RefFormatter";
import { useQuery } from 'react-query';
import FormacaoAcademicaRepository from '../../../../../Repository/Implementations/FormacaoAcademicaRepository';
import Swal from 'sweetalert2';


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
    const [formacoes, setFormacoes] = useState<FormacaoModel[]>([]);
    const userToken = sessionStorage.getItem("userToken") ?? "";
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
                        return formacoes.find(VALUE => VALUE.codigo == selectedRows[0]);
                    }
                })()
            });
        }
    };

    const propriedadesColunas: GridColDef[] = [
        { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
        { field: 'education', headerName: 'Formação', width: 300, sortable: false },
    ];

    const { isFetching: formacaoIsFetching, refetch: formacaoAtuacaoRefetch } = useQuery(
        ["areasAtuacao", gridPage],
        (async () => {
            let result = await new FormacaoAcademicaRepository().getAcademicBackgrounds(userToken, gridPage * 5, 5);
            setFormacoes(result);
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const { data: formacaoAtuacaoCount, refetch: formacaoAtuacaoCountRefetc } = useQuery(
        ["formacaoAtuacaoCount", gridPage],
        (async () => {
            let result = await new FormacaoAcademicaRepository().countAcademicBackgrounds(userToken);
            return result;
        }),
        { refetchOnWindowFocus: false, cacheTime: 2000 }
    );

    const saveFormcao = async () => {
        let formacao: FormacaoModel = RefFormatter.getObjectFromRefs(new FormacaoModel(), refsMap);

        let result;
        if (formacoes.find(VALUE => VALUE.codigo == formacao.codigo)) {
            result = await new FormacaoAcademicaRepository().modifyAcademicBackground(userToken, formacao);
        } else {
            result = await new FormacaoAcademicaRepository().addAcademicBackground(userToken, formacao);
        }

        if (result) {
            Swal.fire({
                icon: 'success',
                text: 'Salvo com sucesso!',
            }).then(() => {
                callBackModal();
                formacaoAtuacaoRefetch();
                formacaoAtuacaoCountRefetc();
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar!',
            });
        }
    }

    const deleteFormacao = async () => {
        let results = [];
        for (let VALUE of selectedRows) {
            let result = await new FormacaoAcademicaRepository().logicalDeleteAcademicBackground(userToken, VALUE.toString());
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
            formacaoAtuacaoRefetch();
            formacaoAtuacaoCountRefetc();
        });

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
                    onClick={deleteFormacao}
                />
            </div >
            <div className={styles["grid_container"]}>
                <Grid
                    loading={formacaoIsFetching}
                    linhasGrid={formacoes ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={formacaoAtuacaoCount ?? 0}
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
            <TextFieldComponent id={styles["formacao"]} inputRef={props.refs.get("education")} sx={{ width: "100%" }} value={props.content?.education ?? ""} label='Formação' />
        </>
    )
}

export default FormacaoAcademica;

