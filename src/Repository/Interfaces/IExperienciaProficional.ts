import ExperienciaDeTrabalhoModel from "../../Models/Objects/ExperienciaDeTrabalhoModel"

export default interface IExperienciaProficional {
    logicalDeleteWorkEperience: (userToken: string, codigo: string) => Promise<boolean>
    addWorkExperience: (userToken: string, experiencia: ExperienciaDeTrabalhoModel) => Promise<boolean>
    modifyWorkExperience: (userToken: string, experiencia: ExperienciaDeTrabalhoModel) => Promise<boolean>
    getWorkExperienceList: (userToken: string, skip: number, take: number) => Promise<ExperienciaDeTrabalhoModel[]>
    getWorkExperienceByStringQuery: (userToken: string, skip: number, take: number, query: string) => Promise<ExperienciaDeTrabalhoModel[]>
    countWorkExperiencesByQuery: (userToken: string, query: string) => Promise<number>
    countWorkExperiences: (userToken: string) => Promise<number>
    getWorkExperienceById: (userToken: string, codigo: string) => Promise<ExperienciaDeTrabalhoModel>
}