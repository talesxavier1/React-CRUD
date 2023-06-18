import LinguasFaladasModel from "../../Models/Objects/LinguasFaladasModel"


export default interface ILinguasFaladasRepository {
    logicalDeleteLingua: (userToken: string, codigo: string) => Promise<boolean>
    addLingua: (userToken: string, lingua: LinguasFaladasModel) => Promise<boolean>
    modifyLingua: (userToken: string, lingua: LinguasFaladasModel) => Promise<boolean>
    getLinguaList: (userToken: string, skip: number, take: number, codigoRef?: string) => Promise<LinguasFaladasModel[]>
    getLinguaByStringQuery: (userToken: string, skip: number, take: number, query: string, codigoRef?: string) => Promise<LinguasFaladasModel[]>
    countLinguaByQuery: (userToken: string, query: string) => Promise<number>
    countLingua: (userToken: string, codigoRef?: string) => Promise<number>
    getLinguaById: (userToken: string, codigo: string) => Promise<LinguasFaladasModel | undefined>
}