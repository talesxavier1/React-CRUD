import TurmaConhecimentoAreaModel from "../../Models/Objects/TurmaAreaConhecimento";

export default interface TurmaAreaConhecimentoRepository {
    addClassKnowledgeArea: (userToken: string, turmaConhecimentoAreaModel: TurmaConhecimentoAreaModel) => Promise<boolean>;
    countClassKnowledgeAreas: (userToken: string) => Promise<number>;
    countClassKnowledgeAreasByQuery: (userToken: string, query: string) => Promise<number>;
    getClassKnowledgeAreaById: (userToken: string, codigo: string) => Promise<TurmaConhecimentoAreaModel | null>;
    getClassKnowledgeAreas: (userToken: string, skip: number, take: number) => Promise<TurmaConhecimentoAreaModel[]>;
    getClassKnowledgeAreasByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<TurmaConhecimentoAreaModel[]>;
    logicalDeleteClassKnowledgeArea: (userToken: string, codigo: string) => Promise<boolean>;
    modifyClassKnowledgeArea: (userToken: string, turmaConhecimentoAreaModel: TurmaConhecimentoAreaModel) => Promise<boolean>;
}
