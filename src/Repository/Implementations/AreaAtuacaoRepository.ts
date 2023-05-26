import AreaAtuacaoModel from "../../Models/Objects/AreaAtuacaoModel";
import { RequestModel } from "../../utils/Request";
import IAreaAtuacaoRepository from "../Interfaces/IAreaAtuacaoRepository";


export default class AreaAtuacaoRepository implements IAreaAtuacaoRepository {

    addAreaOfSpecialization = async (userToken: string, areaAtuacao: AreaAtuacaoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/addAreaOfSpecialization`;
        let response: any = await RequestModel().request(url, "POST", areaAtuacao, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

    countAreaOfSpecialization = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/countAreaOfSpecialization`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    countAreaOfSpecializationByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/countAreaOfSpecializationByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    getAreaOfSpecializationById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/getAreaOfSpecializationById?codigo={0}`.replace("{0}", codigo);
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as AreaAtuacaoModel);
        }
        return null;
    }

    getAreasOfSpecialization = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/getAreasOfSpecialization?skip={0}&take={1}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString());
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as AreaAtuacaoModel[]);
        }
        return [];
    }

    getAreasOfSpecializationByQuery = async (userToken: string, skip: number, take: number, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/getAreasOfSpecializationByQuery?skip={0}&take={1}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString());
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as AreaAtuacaoModel[]);
        }
        return [];
    }

    logicalDeleteAreaOfSpecialization = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/logicalDeleteAreaOfSpecialization?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

    modifyAreaOfSpecialization = async (userToken: string, areaAtuacao: AreaAtuacaoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/areaOfSpecialization/modifyAreaOfSpecialization`;
        let response: any = await RequestModel().request(url, "POST", areaAtuacao, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }
}