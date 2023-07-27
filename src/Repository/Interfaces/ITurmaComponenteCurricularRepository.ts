import AreaAtuacaoModel from "../../Models/Objects/AreaAtuacaoModel";
import { TurmaComponenteCurricularModel } from "../../Models/Objects/TurmaComponenteCurricular";

export default interface ITurmaComponenteCurricularRepository {
    addCurricularComponent: (userToken: string, componenteCurricular: TurmaComponenteCurricularModel) => Promise<boolean>;
    countCurricularComponents: (userToken: string) => Promise<number>;
    countCurricularComponentsByQuery: (userToken: string, query: string) => Promise<number>;
    getCurricularComponentById: (userToken: string, codigo: string) => Promise<TurmaComponenteCurricularModel | null>;
    getCurricularComponents: (userToken: string, skip: number, take: number) => Promise<TurmaComponenteCurricularModel[]>;
    getCurricularComponentsByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<TurmaComponenteCurricularModel[]>;
    logicalDeleteCurricularComponent: (userToken: string, codigo: string) => Promise<boolean>;
    modifyCurricularComponent: (userToken: string, areaAtuacao: AreaAtuacaoModel) => Promise<boolean>;
}