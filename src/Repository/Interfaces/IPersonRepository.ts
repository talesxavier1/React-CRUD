import { IPessoaModel } from "../../Models/Interfaces/IPessoaModel"
import { PessoaModel } from "../../Models/Objects/PessoaModel"

export default interface IPersonRepository {
    logicalDeletePerson: (userToken: string, codigo: string) => Promise<boolean>
    addPerson: (userToken: string, pessoa: IPessoaModel) => Promise<boolean>
    modifyPerson: (userToken: string, pessoa: IPessoaModel) => Promise<boolean>
    getPersonList: (userToken: string, skip: number, take: number) => Promise<PessoaModel[]>
    getPersonsByStringQuery: (userToken: string, query: string) => Promise<PessoaModel[]>
    countPersonsByQuery: (userToken: string, query: string) => Promise<number>
    getPersonById: (userToken: string, codigo: string) => Promise<IPessoaModel | undefined>
    countPersons: (userToken: string) => Promise<number>
}