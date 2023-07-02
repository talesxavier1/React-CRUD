import styles from "./CadastroIdiomas.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import ModalComponent from "../../../../Components/Modal/ModalComponent"
import { MutableRefObject, useContext, useMemo, useState } from "react"
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent"
import SelectComponent from "../../../../Components/Select/SelectComponent"
import LinguasFaladasModel from "../../../../../Models/Objects/LinguasFaladasModel"
import { ProfessorContext } from "../../ProfessorContext"
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid"
import { useQuery } from "react-query"
import DateFormat from "../../../../../utils/DateFormat"
import Grid from "../../../../Components/Grid/Grid"
import RefFormatter from "../../../../../utils/RefFormatter"

interface ICadastroIdiomas {
    id: string
}

const CadastroIdiomas = (props: ICadastroIdiomas) => {
    const professorContext = useContext(ProfessorContext);
    const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: LinguasFaladasModel }>({ isOpen: false, content: undefined });
    const [gridPage, setGridPage] = useState<number>(0);

    const { isFetching: idiomasIsFetching, refetch: idiomasRefetch } = useQuery(
        ["idiomas", professorContext?.professor?.codigo, gridPage],
        (async () => {
            let result = await professorContext?.getIdiomas(gridPage * 5, 5, professorContext?.professor?.codigo);
            let resultCount = await professorContext?.countIdioma(professorContext?.professor?.codigo);

            professorContext?.setIdiomas({
                count: resultCount ?? 0,
                idiomas: result ?? []
            });
            return
        }),
        { refetchOnWindowFocus: false, cacheTime: 0, enabled: !!professorContext?.professor?.codigo }
    );

    const propriedadesColunas: GridColDef[] = useMemo((): GridColDef[] => {
        return [
            { field: 'codigo', type: 'string', headerName: 'Código', width: 300, sortable: false },
            { field: 'languageName', headerName: 'Idioma', width: 200, sortable: false },
            { field: 'proficiencyLevel', headerName: 'Nível de Proficiência', width: 200, sortable: false, filterable: true },
        ];
    }, []);

    let idiomasRefs = RefFormatter.generateObjectRefs(new LinguasFaladasModel(), ["codigoRef"]);

    return (
        <div className={styles["container"]} id={props.id}>
            <div className={styles["buttons-container"]}>
                <><ModalComponent
                    modalAberto={modalProps.isOpen}
                    closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                    content={<Content idioma={modalProps.content} refsMap={idiomasRefs} />}
                    btnSaveAction={() => { }}
                />
                </>
                <><ButtonComponent value='Adicionar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#539553'
                    }}
                    onClick={() => { setModalProps({ isOpen: true, content: undefined }) }} />
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
            <div className={styles["grid_container"]}>
                <Grid
                    loading={idiomasIsFetching}
                    linhasGrid={professorContext?.idiomas?.idiomas ?? []}
                    propriedadesColunas={propriedadesColunas}
                    setSelectedRows={setSelectedRows}
                    gridSizePage={professorContext?.idiomas?.count ?? 0}
                    pageChange={setGridPage}
                    currentPage={gridPage}
                />
            </div>
        </div>
    )
}

const Content = (props: { idioma?: LinguasFaladasModel, refsMap: Map<string, MutableRefObject<any>> }) => {
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
            <><TextFieldComponent label='Idioma'
                inputRef={props.refsMap.get("languageName")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["idioma"]}
                sx={{ width: "100%" }}
            />
            </>
            <><SelectComponent inputLabel='Nível de Proficiência'
                inputRefID={props.refsMap.get("proficiencyLevel")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["nivel_de_proficiencia"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                options={[
                    { "desc": "Básico", "id": "Básico" },
                    { "desc": "Intermediário", "id": "Intermediário" },
                    { "desc": "Avançado", "id": "Avançado" },
                    { "desc": "Nativo", "id": "Nativo" }
                ]}
            />
            </>
            <><TextFieldComponent label='Aplicações Práticas'
                inputRef={props.refsMap.get("practicalApplications")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["aplicacoes_praticas"]}
                sx={{ width: "100%" }}
                multiline={{ rows: 3 }}
            />
            </>
        </div>





    )
}

export default CadastroIdiomas;
