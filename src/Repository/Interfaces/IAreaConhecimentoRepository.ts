import AreaConhecimentoModel from "../../Models/Objects/AreaConhecimentoModel";

export default interface IAreaConhecimentoRepository {
    addKnowledgeArea: (userToken: string, areaConhecimentoModel: AreaConhecimentoModel) => Promise<boolean>;
    countKnowledgeAreas: (userToken: string) => Promise<number>;
    countKnowledgeAreasByQuery: (userToken: string, query: string) => Promise<number>;
    getKnowledgeAreaById: (userToken: string, codigo: string) => Promise<AreaConhecimentoModel | null>;
    getKnowledgeAreas: (userToken: string, skip: number, take: number) => Promise<AreaConhecimentoModel[]>;
    getKnowledgeAreasByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<AreaConhecimentoModel[]>;
    logicalDeleteKnowledgeArea: (userToken: string, codigo: string) => Promise<boolean>;
    modifyKnowledgeArea: (userToken: string, areaConhecimentoModel: AreaConhecimentoModel) => Promise<boolean>;
}
