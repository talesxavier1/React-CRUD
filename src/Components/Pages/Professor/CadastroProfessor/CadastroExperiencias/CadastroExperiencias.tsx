import styles from "./CadastroExperiencias.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";

interface ICadastroExperiencias {
    id: string
}

const CadastroExperiencias = (props: ICadastroExperiencias) => {

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
        <div className={styles["content_container"]}>
            <><TextFieldComponent label='Código'
                readonly
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["codigo"]}
                sx={{ width: "330px" }}
            />
            </>
            <><TextFieldComponent label='Nome da Instituição'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["nome_da_instituicao"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Cargo Ocupado'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["cargo_ocupado"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Área de Atuação'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["area_de_atuacao"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Data de início'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_inicio"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Data Fim'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["data_fim"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Descrição das Atividades Realizadas'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["descricao_das_atividades_realizadas"]}
                sx={{ width: "100%", height: "100%" }}
                multiline={{ rows: 4 }}
            />
            </>
            <><TextFieldComponent label='Regime de contratação'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["regime_de_contratacao"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Carga Horária Semanal'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["carga_horaria_semanal"]}
                sx={{ width: "100%" }}
            />
            </>
            <><TextFieldComponent label='Salário ou Remuneração Recebida'
                // inputRef={refsMap.get("codigo")}
                // value={pessoaContext?.pessoa?.codigo ?? ""}
                id={styles["salario_ou_remuneracao_recebida"]}
                sx={{ width: "100%" }}
            />
            </>
        </div>
    )
}

export default CadastroExperiencias;