import { IPessoaModel } from "../../Models/Interfaces/IPessoaModel";
import { PessoaModel } from "../../Models/Objects/PessoaModel";
import { RequestModel } from "../../utils/Request";
import IPersonRepository from "../Interfaces/IPersonRepository";


export default class PersonRepository implements IPersonRepository {

    countPersons = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Person/countPersons`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data;
        }
        return 0;
    };

    logicalDeletePerson = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Person/logicalDeletePerson?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    addPerson = async (userToken: string, pessoa: IPessoaModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Person/addPerson`;
        let response: any = await RequestModel().request(url, "POST", pessoa, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    modifyPerson = async (userToken: string, pessoa: IPessoaModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Person/modifyPerson`;
        let response: any = await RequestModel().request(url, "POST", pessoa, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    getPersonList = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Person/getPersonList?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as PessoaModel[]);
        }
        return [];
    }

    getPersonsByStringQuery = async (userToken: string, query: string) => {
        let url = "https://localhost:7179/Person/getPersonsByStringQuery";
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as PessoaModel[]);
        }
        return [];
    }

    getPersonById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Person/getPersonById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as PessoaModel;
        }
        return undefined;
    }
}