import CursoModel from "../../Models/Objects/CursoModel";
import { RequestModel } from "../../utils/Request";
import ICursoRepository from "../Interfaces/ICursoRepository";


export default class CursoRepository implements ICursoRepository {

    logicalDeleteCourse = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/logicalDeleteCourse?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    addCourse = async (userToken: string, curso: CursoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/addCourse`;
        let response: any = await RequestModel().request(url, "POST", curso, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    modifyCourse = async (userToken: string, curso: CursoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/modifyCourse`;
        let response: any = await RequestModel().request(url, "POST", curso, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    getCourseList = async (userToken: string, skip: number, take: number, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/getCourseList?skip={0}&take={1}{2}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString())
            .replace("{2}", codigoRef ? `&codigoRef=${codigoRef}` : "");

        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as CursoModel[]);
        }
        return [];
    }

    getCourseByStringQuery = async (userToken: string, skip: number, take: number, query: string, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/getCourseByStringQuery?skip={0}&take={1}{2}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString())
            .replace("{2}", codigoRef ? `&codigoRef=${codigoRef}` : "");
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as CursoModel[]);
        }
        return [];
    }

    countCourseByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/countCourseByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    countCourse = async (userToken: string, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/countCourse{0}`.replace("{0}", codigoRef ? `?codigoRef=${codigoRef}` : "");;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    getCourseById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Course/getCourseById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as CursoModel;
        }
        return undefined;
    }

}