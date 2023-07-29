import { ComponenteCurricularModel } from "../../Models/Objects/ComponenteCurricularModel";

export default interface IComponenteCurricularRepository {
    addCurricularComponent: (userToken: string, componenteCurricular: ComponenteCurricularModel) => Promise<boolean>;
    countCurricularComponents: (userToken: string) => Promise<number>;
    countCurricularComponentsByQuery: (userToken: string, query: string) => Promise<number>;
    getCurricularComponentById: (userToken: string, codigo: string) => Promise<ComponenteCurricularModel | null>;
    getCurricularComponents: (userToken: string, skip: number, take: number) => Promise<ComponenteCurricularModel[]>;
    getCurricularComponentsByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<ComponenteCurricularModel[]>;
    logicalDeleteCurricularComponent: (userToken: string, codigo: string) => Promise<boolean>;
    modifyCurricularComponent: (userToken: string, componenteCurricularModel: ComponenteCurricularModel) => Promise<boolean>;
}