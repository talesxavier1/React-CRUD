import styles from "./CadastroExperiencias.module.css"
import ButtonComponent from "../../../../Components/Button/ButtonComponent"
import { useContext, useState } from "react";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import TextFieldComponent from "../../../../Components/TextField/TextFieldComponent";
import DateField from "../../../../Components/DateField/DateField";
import SelectComponent from "../../../../Components/Select/SelectComponent";
import { ProfessorContext } from "../../ProfessorContext";
import SelectSearchComponent from "../../../../Components/SelectSearch/SelectSearchComponent";

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
    const professorContext = useContext(ProfessorContext);

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
            <><SelectSearchComponent inputLabel='Cargo Ocupado'
                id={styles["cargo_ocupado"]}
                sx={{ width: "100%" }}
                getOptions={async (textSearch: string, skip: number, take: number) => {
                    let result = await professorContext?.getFuncao(skip, take, textSearch);
                    if (result) {
                        return result.map(VALUE => {
                            return {
                                "desc": VALUE.position,
                                "id": VALUE.codigo,
                                "optionOriginalValue": VALUE
                            }
                        });
                    }
                    return [];
                }}
                countOptions={async (textSearch: string) => {
                    let result = await professorContext?.countFuncao(textSearch);
                    return result ?? 0;
                }}
            />
            </>
            <><SelectSearchComponent inputLabel='Área de Atuação'
                id={styles["area_de_atuacao"]}
                sx={{ width: "100%" }}
                getOptions={async (textSearch: string, skip: number, take: number) => {
                    let result = await professorContext?.getAreaAtuacao(textSearch, skip, take);
                    if (result) {
                        return result.map(VALUE => {
                            return {
                                "desc": VALUE.area,
                                "id": VALUE.codigo,
                                "optionOriginalValue": VALUE
                            }
                        });
                    }
                    return [];
                }}
                countOptions={async (textSearch: string) => {
                    let result = await professorContext?.countAreaAtuacao(textSearch);
                    return result ?? 0;
                }}
            />
            </>
            <><DateField label='Data de início'
                id={styles["data_inicio"]}
                sx={{ width: "100%" }}
            />
            </>
            <><DateField label='Data Fim'
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
            <><SelectComponent inputLabel='Regime de contratação'
                id={styles["regime_de_contratacao"]}
                sx={{ width: "100%" }}
                asyncOptions={false}
                options={[
                    { desc: "Tempo determinado", id: "Tempo determinado" },
                    { desc: "Tempo indeterminado", id: "Tempo indeterminado" },
                    { desc: "Trabalho eventual", id: "Trabalho eventual" },
                    { desc: "Estágio", id: "Estágio" },
                    { desc: "Experiência", id: "Experiência" },
                    { desc: "Teletrabalho", id: "Teletrabalho" },
                    { desc: "Intermitente", id: "Ieletrabalho" },
                    { desc: "Autônomo", id: "Autônomo" }
                ]}
            />
            </>
            <><TextFieldComponent label='Carga Horária Semanal'
                id={styles["carga_horaria_semanal"]}
                sx={{ width: "100%" }}
                type="number"
            />
            </>
            <><TextFieldComponent label='Salário ou Remuneração Recebida'
                id={styles["salario_ou_remuneracao_recebida"]}
                sx={{ width: "100%" }}
                type="monetary"
            />
            </>
        </div>
    )
}

export default CadastroExperiencias;