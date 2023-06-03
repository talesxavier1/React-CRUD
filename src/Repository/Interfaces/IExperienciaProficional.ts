import ExperienciaDeTrabalhoModel from "../../Models/Objects/ExperienciaDeTrabalhoModel"

export default interface IExperienciaProficional {
    logicalDeleteWorkEperience: (userToken: string, codigo: string) => Promise<boolean>
    addWorkExperience: (userToken: string, experiencia: ExperienciaDeTrabalhoModel) => Promise<boolean>
    modifyWorkExperience: (userToken: string, experiencia: ExperienciaDeTrabalhoModel) => Promise<boolean>
    getWorkExperienceList: (userToken: string, skip: number, take: number, codigoRef?: string) => Promise<ExperienciaDeTrabalhoModel[]>
    getWorkExperienceByStringQuery: (userToken: string, skip: number, take: number, query: string, codigoRef?: string) => Promise<ExperienciaDeTrabalhoModel[]>
    countWorkExperiencesByQuery: (userToken: string, query: string) => Promise<number>
    countWorkExperiences: (userToken: string, codigoRef?: string) => Promise<number>
    getWorkExperienceById: (userToken: string, codigo: string) => Promise<ExperienciaDeTrabalhoModel | undefined>
}