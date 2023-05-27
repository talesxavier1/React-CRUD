import styles from "./CadastroIdiomas.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import ModalComponent from "../../../../Components/Modal/ModalComponent"
import { useState } from "react"
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent"
import SelectComponent from "../../../../Components/Select/SelectComponent"

interface ICadastroIdiomas {
    id: string
}

const CadastroIdiomas = (props: ICadastroIdiomas) => {

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
                    onClick={callBackcloseOpenModal} />
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
            <><TextFieldComponent label='Idioma'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["idioma"]}
                sx={{ width: "100%" }}
            />
            </>
            <><SelectComponent inputLabel='Nível de Proficiência'
                // inputRef={refsMap.get("codigo")}
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
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["aplicacoes_praticas"]}
                sx={{ width: "100%" }}
            />
            </>
        </div>





    )
}

export default CadastroIdiomas;
