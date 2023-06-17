export interface IExperienciaDeTrabalho {
    codigo: string
    codigoRef: string
    nomeInstituicao: string
    cargo: string
    cargoID: string
    areaAtuacao: string
    areaAtuacaoID: string
    dataInicio: string | undefined
    dataFim: string | undefined
    descricao: string
    regimeContratacao: string
    cargaHoraria: number
    salario: number
}
