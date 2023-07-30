import AreaConhecimentoModel from "../../Models/Objects/AreaConhecimentoModel";
import { RequestModel } from "../../utils/Request";
import IAreaConhecimentoRepository from "../Interfaces/IAreaConhecimentoRepository";


export default class AreaConhecimentoRepository implements IAreaConhecimentoRepository {

    addKnowledgeArea = async (userToken: string, conhecimentoAreaModel: AreaConhecimentoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/addKnowledgeArea`;
        let response: any = await RequestModel().request(url, "POST", conhecimentoAreaModel, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };
    countKnowledgeAreas = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/countKnowledgeAreas`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };
    countKnowledgeAreasByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/countKnowledgeAreasByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };
    getKnowledgeAreaById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/getKnowledgeAreaById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as AreaConhecimentoModel);
        }
        return null;
    };
    getKnowledgeAreas = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/getKnowledgeAreas?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as AreaConhecimentoModel[]);
        }
        return [];
    };
    getKnowledgeAreasByQuery = async (userToken: string, skip: number, take: number, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/getKnowledgeAreasByQuery?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as AreaConhecimentoModel[]);
        }
        return [];
    };
    logicalDeleteKnowledgeArea = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/logicalDeleteKnowledgeArea?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }
    modifyKnowledgeArea = async (userToken: string, conhecimentoAreaModel: AreaConhecimentoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/KnowledgeArea/modifyKnowledgeArea`;
        let response: any = await RequestModel().request(url, "POST", conhecimentoAreaModel, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

}