import FormacaoModel from "../../Models/Objects/FormacaoModel";
import { RequestModel } from "../../utils/Request";
import IFormacaoAcademicaRepository from "../Interfaces/IFormacaoAcademicaRepository";

export default class FormacaoAcademicaRepository implements IFormacaoAcademicaRepository {

    addAreaOfSpecialization = async (userToken: string, formacaoAcademica: FormacaoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/addAcademicBackground`;
        let response: any = await RequestModel().request(url, "POST", formacaoAcademica, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

    countAreaOfSpecialization = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/countAcademicBackgrounds`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    getAreaOfSpecializationById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/getAcademicBackgroundById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as FormacaoModel);
        }
        return null;
    }

    getAreasOfSpecialization = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/getAcademicBackgrounds?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as FormacaoModel[]);
        }
        return [];
    }

    logicalDeleteAreaOfSpecialization = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/logicalDeleteAcademicBackground?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }

    modifyAreaOfSpecialization = async (userToken: string, formacaoAcademica: FormacaoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/academicBackground/modifyAcademicBackground`;
        let response: any = await RequestModel().request(url, "POST", formacaoAcademica, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }
}