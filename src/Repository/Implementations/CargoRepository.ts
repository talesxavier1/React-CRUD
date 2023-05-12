import CargosModel from "../../Models/Objects/CargosModel";
import { RequestModel } from "../../utils/Request";
import ICargoRepository from "../Interfaces/ICargoRepository";



export default class CargoRepository implements ICargoRepository {


    addPosition = async (userToken: string, cargo: CargosModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/position/addPosition`;
        let response: any = await RequestModel().request(url, "POST", cargo, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };

    countPositions = async (userToken: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/position/countPositions`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as number;
        }
        return 0;
    };


    getPositionById = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/position/getPositionById?codigo=${codigo}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as CargosModel;
        }
        return null;
    };


    getPositions = async (userToken: string, skip: number, take: number) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/position/getPositions?skip=${skip}&take=${take}`;
        let response: any = await RequestModel().request(url, "GET", null, { "userToken": userToken }, true);
        if (response?.oparationStatus == 0) {
            return response.data as CargosModel[];
        }
        return [];
    };


    logicalDeletePosition = async (userToken: string, codigo: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/position/logicalDeletePosition?codigos=${codigo}`;
        let response: any = await RequestModel().request(url, "POST", null, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };


    modifyPosition = async (userToken: string, cargo: CargosModel) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/position/modifyPosition`;
        let response: any = await RequestModel().request(url, "POST", cargo, { "userToken": userToken }, true);
        return response?.oparationStatus == 0;
    };

}