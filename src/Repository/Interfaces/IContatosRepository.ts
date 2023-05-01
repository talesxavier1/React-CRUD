import { ContatoModel } from "../../Models/Objects/ContatoModel";

export interface IContatosRepository {
    getContacts: (userToken: string, skip: number, take: number, codifoRef?: string) => Promise<ContatoModel[]>
    countContacts: (userToken: string, codifoRef?: string) => Promise<number>
    addContact: (userToken: string, contato: ContatoModel) => Promise<boolean>
    logicallyDeleteContact: (userToken: string, codigo: string) => Promise<boolean>
    modifyContact: (userToken: string, contato: ContatoModel) => Promise<boolean>
    getContactById: (userToken: string, codigo: string) => Promise<ContatoModel | undefined>
}


