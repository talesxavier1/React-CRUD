import { useCallback, useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/TextFieldComponent';
import styles from './CadastroProfessor.module.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CadastroExperiencias from './CadastroExperiencias/CadastroExperiencias';
import CadastroCursos from './CadastroCursos/CadastroCursos';
import CadastroIdiomas from './CadastroIdiomas/CadastroIdiomas';



const CadastroProfessor = () => {
    const [tabShow, setTabShow] = useState<number>(0);

    return (
        <div className={styles['container']}>
            <div className={styles['fields-container']}>

                {/* Campos */}
                <>
                    <TextFieldComponent id={styles["codigo"]} sx={{ width: "330px" }} label='Código' />
                    <TextFieldComponent id={styles["pessoa"]} sx={{ width: "100%" }} label='Pessoa' />
                    <TextFieldComponent id={styles["cpf"]} sx={{ width: "100%" }} label='CPF' />
                    <TextFieldComponent id={styles["formaçoes_academicas"]} sx={{ width: "100%" }} label='Formações Acadêmicas' />
                    <TextFieldComponent id={styles["funcao"]} sx={{ width: "100%" }} label='Função' />
                    <TextFieldComponent id={styles["carga_horaria"]} sx={{ width: "100%" }} label='Carga horária' />
                    <TextFieldComponent id={styles["valor_da_hora_aula"]} sx={{ width: "100%" }} label='Valor da Hora-Aula' />
                    <TextFieldComponent id={styles["areas_de_atuaçao"]} sx={{ width: "100%" }} label='Áreas de Atuação' />
                    <TextFieldComponent id={styles["nivels_de_ensino_que_ministra"]} sx={{ width: "100%" }} label='Nívels de Ensino que Ministra' />
                    <TextFieldComponent id={styles["data_de_inicio_da_contratacao"]} sx={{ width: "100%" }} label='Data de Início da Contratação' />
                    <TextFieldComponent id={styles["tipo_de_contrato"]} sx={{ width: "100%" }} label='Tipo de Contrato' />
                </>

                {/* ABAS */}
                <>
                    <div id={styles["abas"]}>
                        <Tabs value={tabShow} onChange={(event: React.SyntheticEvent, newValue: number) => { setTabShow(newValue); }}>
                            <Tab label="Experiências" />
                            <Tab label="Cursos" />
                            <Tab label="Idiomas" />
                        </Tabs>
                    </div>
                    {
                        useCallback(() => {
                            switch (tabShow) {
                                case 0:
                                    return (
                                        <CadastroExperiencias id={styles["showTab"]} />
                                    );
                                case 1:
                                    return (
                                        <CadastroCursos id={styles["showTab"]} />
                                    );
                                case 2:
                                    return (
                                        <CadastroIdiomas id={styles["showTab"]} />
                                    );
                            }
                        }, [tabShow])()
                    }
                </>
            </div>
        </div>
    );
}




export default CadastroProfessor;