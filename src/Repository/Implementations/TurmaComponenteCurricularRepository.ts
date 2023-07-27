import AreaAtuacaoModel from "../../Models/Objects/AreaAtuacaoModel";
import { TurmaComponenteCurricularModel } from "../../Models/Objects/TurmaComponenteCurricular";
import { RequestModel } from "../../utils/Request";
import ITurmaComponenteCurricularRepository from "../Interfaces/ITurmaComponenteCurricularRepository";

export class TurmaComponenteCurricularRepository implements ITurmaComponenteCurricularRepository {

    addCurricularComponent = async (userToken: string, componenteCurricular: TurmaComponenteCurricularModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/addCurricularComponent`;
        let response: any = await RequestModel().request(url, "POST", componenteCurricular, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };

    countCurricularComponents = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/countCurricularComponents`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };

    countCurricularComponentsByQuery = async (userToken: string, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/countCurricularComponentsByQuery`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as number);
        }
        return 0;
    };

    getCurricularComponentById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/getCurricularComponentById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaComponenteCurricularModel);
        }
        return null;
    };

    getCurricularComponents = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/getCurricularComponents?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaComponenteCurricularModel[]);
        }
        return [];
    };

    getCurricularComponentsByQuery = async (userToken: string, skip: number, take: number, query: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/getCurricularComponentsByQuery?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "POST", query, { "userToken": userToken, "Content-Type": 'application/json' }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as TurmaComponenteCurricularModel[]);
        }
        return [];
    };

    logicalDeleteCurricularComponent = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/logicalDeleteCurricularComponent?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };

    modifyCurricularComponent = async (userToken: string, areaAtuacao: AreaAtuacaoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/ClassCurricularComponent/modifyCurricularComponent`;
        let response: any = await RequestModel().request(url, "POST", areaAtuacao, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };
}
