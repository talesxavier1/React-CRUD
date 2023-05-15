import styles from "./CadastroCursos.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";

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
                <><ButtonComponent
                    value='Adicionar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        backgroundColor: '#539553'
                    }}
                    onClick={callBackcloseOpenModal}
                />
                </>
                <><ButtonComponent
                    value='Editar'
                    variant='outlined'
                    style={{
                        color: '#222834',
                        // backgroundColor: `${selectedRows.length == 1 ? "#6C757D" : ""}`
                    }}
                // onClick={() => { setModalAdicionar({ modalaberto: true, conteudoModal: (pessoaContext?.enderecos ?? []).find(VALUE => VALUE.codigo == selectedRows[0]) }) }}
                // disabled={selectedRows.length != 1}
                />
                </>
                <><ButtonComponent
                    value='Excluir'
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
        <h1>CONTENT</h1>
    )
}

export default CadastroCursos;