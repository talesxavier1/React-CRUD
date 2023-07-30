import TurmaModel from "../../Models/Objects/TurmaModel";
import { RequestModel } from "../../utils/Request";
import ITurmaRepository from "../Interfaces/ITurmaRepository";

export class TurmaRepository implements ITurmaRepository {

    addClass = async (userToken: string, turmaModel: TurmaModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/addClass`;
        let response: any = await RequestModel().request(url, "POST", turmaModel, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    };

    countClasses = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/countClasses`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };

    countClassesByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/countClassesByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };

    getClassById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/getClassById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaModel);
        }
        return null;
    };

    getClassList = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/getClassList?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaModel[]);
        }
        return [];
    };

    getClassByQuery = async (userToken: string, skip: number, take: number, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/getClassByQuery?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaModel[]);
        }
        return [];
    };

    logicalDeleteClass = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/logicalDeleteClass?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };

    modifyClass = async (userToken: string, turmaModel: TurmaModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/Class/modifyClass`;
        let response: any = await RequestModel().request(url, "POST", turmaModel, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    }
}