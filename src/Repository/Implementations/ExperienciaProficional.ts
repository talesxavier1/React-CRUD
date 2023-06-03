import ExperienciaDeTrabalhoModel from "../../Models/Objects/ExperienciaDeTrabalhoModel";
import { RequestModel } from "../../utils/Request";
import IExperienciaProficional from "../Interfaces/IExperienciaProficional";


export default class ExperienciaProficional implements IExperienciaProficional {

    logicalDeleteWorkEperience = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/logicalDeleteWorkEperience?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    addWorkExperience = async (userToken: string, experiencia: ExperienciaDeTrabalhoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/addWorkExperience`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    modifyWorkExperience = async (userToken: string, experiencia: ExperienciaDeTrabalhoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/modifyWorkExperience`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    getWorkExperienceList = async (userToken: string, skip: number, take: number, codigoRef?: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/getWorkExperienceList?skip={0}&take={1}{2}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString())
            .replace("{2}", codigoRef ? `&codigoRef=${codigoRef}` : "");
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as ExperienciaDeTrabalhoModel[]);
        }
        return [];
    }

    getWorkExperienceByStringQuery = async (userToken: string, skip: number, take: number, query: string, codigoRef?: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/getWorkExperienceByStringQuery?skip={0}&take={1}{2}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString())
            .replace("{2}", codigoRef ? `&codigoRef=${codigoRef}` : "");
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as ExperienciaDeTrabalhoModel[]);
        }
        return [];
    }

    countWorkExperiencesByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/countWorkExperiencesByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    countWorkExperiences = async (userToken: string, codigoRef?: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/countWorkExperiences{0}`
            .replace("{0}", codigoRef ? `?codigoRef=${codigoRef}` : "");
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    getWorkExperienceById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/WorkExperience/getWorkExperienceById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as ExperienciaDeTrabalhoModel;
        }
        return undefined;
    }

}