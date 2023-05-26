import AreaAtuacaoModel from "../../Models/Objects/AreaAtuacaoModel";

export default interface IAreaAtuacaoRepository {
    addAreaOfSpecialization: (userToken: string, areaAtuacao: AreaAtuacaoModel) => Promise<boolean>;
    countAreaOfSpecialization: (userToken: string) => Promise<number>;
    countAreaOfSpecializationByQuery: (userToken: string, query: string) => Promise<number>;
    getAreaOfSpecializationById: (userToken: string, codigo: string) => Promise<AreaAtuacaoModel | null>;
    getAreasOfSpecialization: (userToken: string, skip: number, take: number) => Promise<AreaAtuacaoModel[]>;
    getAreasOfSpecializationByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<AreaAtuacaoModel[]>;
    logicalDeleteAreaOfSpecialization: (userToken: string, codigo: string) => Promise<boolean>;
    modifyAreaOfSpecialization: (userToken: string, areaAtuacao: AreaAtuacaoModel) => Promise<boolean>;
}
