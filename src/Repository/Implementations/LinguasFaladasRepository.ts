import LinguasFaladasModel from "../../Models/Objects/LinguasFaladasModel";
import { RequestModel } from "../../utils/Request";
import ILinguasFaladasRepository from "../Interfaces/ILinguasFaladasRepository";


export default class LinguasFaladasRepository implements ILinguasFaladasRepository {

    logicalDeleteLingua = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/logicalDeleteSpokenLanguage?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    addLingua = async (userToken: string, lingua: LinguasFaladasModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/addSpokenLanguage`;
        let response: any = await RequestModel().request(url, "POST", lingua, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    modifyLingua = async (userToken: string, lingua: LinguasFaladasModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/modifySpokenLanguage`;
        let response: any = await RequestModel().request(url, "POST", lingua, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        return response?.oparationStatus == 0 ? true : false;
    }

    getLinguaList = async (userToken: string, skip: number, take: number, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/getSpokenLanguageList?skip={0}&take={1}{2}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString())
            .replace("{2}", codigoRef ? `&codigoRef=${codigoRef}` : "");

        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as LinguasFaladasModel[]);
        }
        return [];
    }

    getLinguaByStringQuery = async (userToken: string, skip: number, take: number, query: string, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/getSpokenLanguageByQuery?skip={0}&take={1}{2}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString())
            .replace("{2}", codigoRef ? `&codigoRef=${codigoRef}` : "");

        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as LinguasFaladasModel[]);
        }
        return [];
    }

    countLinguaByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/countSpokenLanguageByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    countLingua = async (userToken: string, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/countSpokenLanguage{0}`
            .replace("{0}", codigoRef ? `?codigoRef=${codigoRef}` : "");
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    }

    getLinguaById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/SpokenLanguage/getSpokenLanguageById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as LinguasFaladasModel;
        }
        return undefined;
    }
}