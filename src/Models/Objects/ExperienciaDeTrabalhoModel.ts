import { IExperienciaDeTrabalho } from "../Interfaces/IExperienciaDeTrabalho";

export default class ExperienciaDeTrabalhoModel implements IExperienciaDeTrabalho {
    codigo!: string;
    codigoRef!: string;
    nomeInstituicao!: string;
    cargo!: string;
    cargoID!: string;
    areaAtuacao!: string;
    areaAtuacaoID!: string;
    dataInicio!: string;
    dataFim!: string;
    descricao!: string;
    regimeContratacao!: string;
    cargaHoraria!: number;
    salario!: number;
}