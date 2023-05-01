import { IContatoModel } from "../../Models/Interfaces/IContatoModel";
import { ContatoModel } from "../../Models/Objects/ContatoModel";
import { RequestModel } from "../../utils/Request";
import { IContatosRepository } from "../Interfaces/IContatosRepository";


export default class ContatosRepository implements IContatosRepository {
    countContacts = async (userToken: string, codifoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/contactPerson/countContacts${codifoRef ? `?codigoRef=${codifoRef}` : ""}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    getContacts = async (userToken: string, skip: number, take: number, codifoRef?: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/contactPerson/getContacts?${codifoRef ? `codigoRef=${codifoRef}&` : ""}skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as ContatoModel[]);
        }
        return [];
    }

    addContact = async (userToken: string, contato: ContatoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/contactPerson/addContact`;
        let response: any = await RequestModel().request(url, "POST", contato, { "userToken": userToken }, false);
        if (response?.oparationStatus == 0) {
            return true;
        }
        return false;
    }

    logicallyDeleteContact = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/contactPerson/logicallyDeleteContact?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0;
    }

    modifyContact = async (userToken: string, contato: ContatoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/contactPerson/modifyContact`;
        let response: any = await RequestModel().request(url, "POST", contato, { "userToken": userToken }, false);
        if (response?.oparationStatus == 0) {
            return true;
        }
        return false;
    }

    getContactById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/contactPerson/getContactById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as IContatoModel);
        }
        return undefined;
    }

}