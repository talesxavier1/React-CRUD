import { Iprofessor } from "../Interfaces/IProfessor";

export default class Professor implements Iprofessor {
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
}