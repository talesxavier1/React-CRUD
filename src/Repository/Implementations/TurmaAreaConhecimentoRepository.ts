import TurmaConhecimentoAreaModel from "../../Models/Objects/TurmaAreaConhecimento";
import { RequestModel } from "../../utils/Request";
import ITurmaAreaConhecimentoRepository from "../Interfaces/ITurmaAreaConhecimentoRepository";


export default class TurmaAreaConhecimentoRepository implements ITurmaAreaConhecimentoRepository {

    addClassKnowledgeArea = async (userToken: string, turmaConhecimentoAreaModel: TurmaConhecimentoAreaModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/addClassKnowledgeArea`;
        let response: any = await RequestModel().request(url, "POST", turmaConhecimentoAreaModel, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };
    countClassKnowledgeAreas = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/countClassKnowledgeAreas`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };
    countClassKnowledgeAreasByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/countClassKnowledgeAreasByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };
    getClassKnowledgeAreaById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/getClassKnowledgeAreaById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaConhecimentoAreaModel);
        }
        return null;
    };
    getClassKnowledgeAreas = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/getClassKnowledgeAreas?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaConhecimentoAreaModel[]);
        }
        return [];
    };
    getClassKnowledgeAreasByQuery = async (userToken: string, skip: number, take: number, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/getClassKnowledgeAreasByQuery?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaConhecimentoAreaModel[]);
        }
        return [];
    };
    logicalDeleteClassKnowledgeArea = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/logicalDeleteClassKnowledgeArea?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }
    modifyClassKnowledgeArea = async (userToken: string, turmaConhecimentoAreaModel: TurmaConhecimentoAreaModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassKnowledgeArea/modifyClassKnowledgeArea`;
        let response: any = await RequestModel().request(url, "POST", turmaConhecimentoAreaModel, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

}