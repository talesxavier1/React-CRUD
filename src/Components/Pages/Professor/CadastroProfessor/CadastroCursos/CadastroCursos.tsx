import styles from "./CadastroCursos.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";

interface ICadastroCursos {
    id: string
}

const CadastroCursos = (props: ICadastroCursos) => {

    const [modalAdicionar, setModalAdicionar] = useState<{ modalaberto: boolean /* , conteudoModal?: IEnderecoModel*/ }>({ modalaberto: false });
    const callBackcloseOpenModal = () => {
        if (modalAdicionar.modalaberto) {
            setModalAdicionar({
                modalaberto: false,
                /*  conteudoModal: undefined*/
            });
        } else {
            setModalAdicionar({
                modalaberto: true
            });
        }
    };

    return (
        <div className={styles["container"]} id={props.id}>
            <div className={styles["buttons-container"]}>
                <><ModalComponent
                    modalAberto={modalAdicionar.modalaberto}
                    closeOpenModal={callBackcloseOpenModal}
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
                    onClick={callBackcloseOpenModal}
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
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["carga_horaria"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Data de Início'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_de_inicio"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Data de Fim'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_de_fim"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Modalidade do Curso'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["modalidade_do_curso"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Investimento Financeiro'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["investimento_financeiro"]}
                sx={{ width: "100%" }}
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
