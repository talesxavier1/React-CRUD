import styles from "./CadastroCursos.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";
import DateField from "../../../../Components/DateField/DateField";
import SelectComponent from "../../../../Components/Select/SelectComponent";
import CursoModel from "../../../../../Models/Objects/CursoModel";

interface ICadastroCursos {
    id: string
}

const CadastroCursos = (props: ICadastroCursos) => {
    const [modalProps, setModalProps] = useState<{ isOpen: boolean, content?: CursoModel }>({ isOpen: false, content: undefined });

    return (
        <div className={styles["container"]} id={props.id}>
            <div className={styles["buttons-container"]}>
                <><ModalComponent
                    modalAberto={modalProps.isOpen}
                    closeOpenModal={() => { setModalProps({ isOpen: false, content: undefined }) }}
                    content={<Content />}
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
        </div>
    )
}

const Content = () => {
    return (
        <div className={styles["content_container"]}>
            <><TextFieldComponent label='Código'
                readonly
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["codigo"]}
                sx={{ width: "330px" }}
            />
            </>
            <><TextFieldComponent label='Nome do Curso'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["nome_do_curso"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Instituição de Ensino'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["instituicao_de_ensino"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Carga Horária'
                id={styles["carga_horaria"]}
                sx={{ width: "100%" }}
                type="number"
            />
            </>
            <><DateField label='Data de Início'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_de_inicio"]}
                sx={{ width: "100%" }}
            />
            </>
            <><DateField label='Data de Fim'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_de_fim"]}
                sx={{ width: "100%" }}
            />
            </>
            <><SelectComponent inputLabel='Modalidade do Curso'
                // inputRef={refsMap.get("codigo")}
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
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["investimento_financeiro"]}
                sx={{ width: "100%" }}
                type="monetary"
            />
            </>
            <><TextFieldComponent label='Descrição do Curso'
                // inputRef={refsMap.get("codigo")}
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
