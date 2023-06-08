import { Iprofessor } from "../Interfaces/IProfessor";

export default class ProfessorModel implements Iprofessor {
    codigo!: string;
    pessoa!: string;
    pessoaCPF!: string;
    pessoaID!: string;
    funcao!: string;
    funcaoID!: string;
    cargaHoraria!: number;
    formacaoAcademica!: string;
    formacaoAcademicaID!: string;
    dataInicioContratacao!: string;
    nivelEnsinoQueMinistra!: string;
    tipoContrato!: string;
    areaAtuacao!: string;
    areaAtuacaoID!: string;
    valorHoraAula!: number;

    public static constructorMethod = (codigo: string) => {
        let pessoa = new ProfessorModel();
        pessoa.codigo = codigo;
        return pessoa;
    }

}