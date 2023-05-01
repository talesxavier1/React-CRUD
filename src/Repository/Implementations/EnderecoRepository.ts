import { EnderecoModel } from "../../Models/Objects/EnderecoModel";
import { RequestModel } from "../../utils/Request";
import { IEnderecoRepository } from "../Interfaces/IEnderecoRepository";


export default class EnderecoRepository implements IEnderecoRepository {

    getAddresses = async (userToken: string, skip: number, take: number, codifoRef?: string | undefined) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/personAddress/getAddresses?skip={0}&take={1}{2}`
            .replace("{0}", skip.toString())
            .replace("{1}", take.toString())
            .replace("{2}", codifoRef ? `&codigoRef=${codifoRef}` : "");

        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as EnderecoModel[]);
        }
        return [];
    }

    addAddress = async (userToken: string, endereco: EnderecoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/personAddress/addAddress`;
        let response: any = await RequestModel().request(url, "POST", endereco, { "userToken": userToken }, false);
        return (response?.oparationStatus == 0);
    }

    logicallyDeleteAddress = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/personAddress/logicallyDeleteAddress?codigo={0}`.replace("{0}", codigo);
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, false);
        return (response?.oparationStatus == 0);
    }

    modifyAddress = async (userToken: string, endereco: EnderecoModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/personAddress/modifyAddress`;
        let response: any = await RequestModel().request(url, "POST", endereco, { "userToken": userToken }, false);
        return (response?.oparationStatus == 0);
    }

    getAddressById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/personAddress/getAddressById?codigo={0}`.replace("{0}", codigo);
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return (response.data as EnderecoModel);
        }
        return undefined;
    }

    countAddresses = async (userToken: string, codigoRef?: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/personAddress/countAddresses{0}`.replace("{0}", codigoRef ? `?codigoRef=${codigoRef}` : "");
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return Number(response.data);
        }
        return 0;
    }
}