import ProfessorModel from "../../Models/Objects/ProfessorModel";
import { RequestModel } from "../../utils/Request";
import IProfessorRepository from "../Interfaces/IProfessorRepository";


export class ProfessorRepository implements IProfessorRepository {

    logicalDeleteTeacher = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/logicalDeleteTeacher?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    addTeacher = async (userToken: string, professor: ProfessorModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/addTeacher`;
        let response: any = await RequestModel().request(url, "POST", professor, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    modifyTeacher = async (userToken: string, professor: ProfessorModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/modifyTeacher`;
        let response: any = await RequestModel().request(url, "POST", professor, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    getTeacherList = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/getTeacherList?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as ProfessorModel[]);
        }
        return [];
    }

    getTeacherByQuery = async (userToken: string, skip: number, take: number, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/getTeacherByQuery?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as ProfessorModel[]);
        }
        return [];
    }

    countTeachersByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/countTeachersByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    countTeachers = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/countTeachers`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as number;
        }
        return 0;
    }

    getTeacherById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Teacher/getTeacherById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as ProfessorModel;
        }
        return undefined;
    }

}