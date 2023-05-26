import CargosModel from "../../Models/Objects/CargosModel";

export default interface ICargoRepository {

    addPosition: (userToken: string, cargo: CargosModel) => Promise<boolean>;
    countPositions: (userToken: string) => Promise<number>;
    countPositionsByQuery: (userToken: string, query: string) => Promise<number>;
    getPositionById: (userToken: string, codigo: string) => Promise<CargosModel | null>;
    getPositions: (userToken: string, skip: number, take: number) => Promise<CargosModel[]>;
    getPositionsByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<CargosModel[]>;
    logicalDeletePosition: (userToken: string, codigo: string) => Promise<boolean>;
    modifyPosition: (userToken: string, cargo: CargosModel) => Promise<boolean>;

}




