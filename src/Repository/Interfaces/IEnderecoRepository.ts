import { EnderecoModel } from "../../Models/Objects/EnderecoModel";

export interface IEnderecoRepository {
    getAddresses: (userToken: string, skip: number, take: number, codifoRef?: string) => Promise<EnderecoModel[]>
    addAddress: (userToken: string, endereco: EnderecoModel) => Promise<boolean>
    logicallyDeleteAddress: (userToken: string, codigo: string) => Promise<boolean>
    modifyAddress: (userToken: string, endereco: EnderecoModel) => Promise<boolean>
    getAddressById: (userToken: string, codigo: string) => Promise<EnderecoModel | undefined>
    countAddresses: (userToken: string, codigoRef: string) => Promise<number>
}