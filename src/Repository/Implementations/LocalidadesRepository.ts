import { PaisModel, EstadoModel, MunicipioModel } from "../../Models/Objects/LocalidadesModels";
import { RequestModel } from "../../utils/Request";
import ILocalidadesRepository from "../Interfaces/ILocalidadesRepository";


export default class LocalidadesRepository implements ILocalidadesRepository {

    getCountries = async (userToken: string, codigo?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/localities/getCountries{0}`
            .replace("{0}", codigo ? `?codigo=${codigo}` : "");

        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, false);
        if (response?.oparationStatus == 0) {
            return (response.data as PaisModel[]);
        }
        return [];
    }
    getStates = async (userToken: string, codigo?: string | undefined, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/localities/getStates{0}`;
        if (codigo) {
            url = url.replace("{0}", `?codigo=${codigo}`);
        } else if (codigoRef) {
            url = url.replace("{0}", `?codigoRef=${codigoRef}`);
        } else {
            url = url.replace("{0}", "/");
        }
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as EstadoModel[]);
        }
        return [];
    }
    getCities = async (userToken: string, codigo?: string | undefined, codigoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/localities/getCities{0}`;
        if (codigo) {
            url = url.replace("{0}", `?codigo=${codigo}`);
        } else if (codigoRef) {
            url = url.replace("{0}", `?codigoRef=${codigoRef}`);
        } else {
            url = url.replace("{0}", "");
        }
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as MunicipioModel[]);
        }
        return [];
    }

}