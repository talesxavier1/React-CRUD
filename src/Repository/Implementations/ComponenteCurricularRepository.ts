import { ComponenteCurricularModel } from "../../Models/Objects/ComponenteCurricularModel";
import { RequestModel } from "../../utils/Request";
import IComponenteCurricularRepository from "../Interfaces/IComponenteCurricularRepository";

export class ComponenteCurricularRepository implements IComponenteCurricularRepository {

    addCurricularComponent = async (userToken: string, componenteCurricular: ComponenteCurricularModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/addCurricularComponent`;
        let response: any = await RequestModel().request(url, "POST", componenteCurricular, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };

    countCurricularComponents = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/countCurricularComponents`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };

    countCurricularComponentsByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/countCurricularComponentsByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };

    getCurricularComponentById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/getCurricularComponentById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as ComponenteCurricularModel);
        }
        return null;
    };

    getCurricularComponents = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/getCurricularComponents?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as ComponenteCurricularModel[]);
        }
        return [];
    };

    getCurricularComponentsByQuery = async (userToken: string, skip: number, take: number, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/getCurricularComponentsByQuery?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as ComponenteCurricularModel[]);
        }
        return [];
    };

    logicalDeleteCurricularComponent = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/logicalDeleteCurricularComponent?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };

    modifyCurricularComponent = async (userToken: string, componenteCurricular: ComponenteCurricularModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/CurricularComponent/modifyCurricularComponent`;
        let response: any = await RequestModel().request(url, "POST", componenteCurricular, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };
}
