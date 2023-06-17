import { IExperienciaDeTrabalho } from "../Interfaces/IExperienciaDeTrabalho";

export default class ExperienciaDeTrabalhoModel implements IExperienciaDeTrabalho {
    codigo!: string;
    codigoRef!: string;
    nomeInstituicao!: string;
    cargo!: string;
    cargoID!: string;
    areaAtuacao!: string;
    areaAtuacaoID!: string;
    dataInicio: string | undefined;
    dataFim: string | undefined;
    descricao!: string;
    regimeContratacao!: string;
    cargaHoraria!: number;
    salario!: number;

    public static constructorMethod = (codigo: string) => {
        let pessoa = new ExperienciaDeTrabalhoModel();
        pessoa.codigo = codigo;
        return pessoa;
    }
}