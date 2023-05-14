import FormacaoModel from "../../Models/Objects/FormacaoModel";
import { RequestModel } from "../../utils/Request";
import IFormacaoAcademicaRepository from "../Interfaces/IFormacaoAcademicaRepository";

export default class FormacaoAcademicaRepository implements IFormacaoAcademicaRepository {

    addAcademicBackground = async (userToken: string, formacaoAcademica: FormacaoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/addAcademicBackground`;
        let response: any = await RequestModel().request(url, "POST", formacaoAcademica, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

    countAcademicBackgrounds = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/countAcademicBackgrounds`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    getAcademicBackgroundById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/getAcademicBackgroundById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as FormacaoModel);
        }
        return null;
    }

    getAcademicBackgrounds = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/getAcademicBackgrounds?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as FormacaoModel[]);
        }
        return [];
    }

    logicalDeleteAcademicBackground = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/logicalDeleteAcademicBackground?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

    modifyAcademicBackground = async (userToken: string, formacaoAcademica: FormacaoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/modifyAcademicBackground`;
        let response: any = await RequestModel().request(url, "POST", formacaoAcademica, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }
}