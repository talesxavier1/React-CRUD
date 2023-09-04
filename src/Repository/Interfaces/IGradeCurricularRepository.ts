import GradeCurricularModel from "../../Models/Objects/GradeCurricularModel";

export default interface IGradeCurricularRepository {
    addCurriculumPlan: (userToken: string, gradeCurricularModel: GradeCurricularModel) => Promise<boolean>
    countCurriculumPlans: (userToken: string, codigoRef: string) => Promise<number>;
    countCurriculumPlansByQuery: (userToken: string, query: string, codigoRef: string) => Promise<number>;
    getCurriculumPlanById: (userToken: string, codigo: string) => Promise<GradeCurricularModel | null>;
    getCurriculumPlans: (userToken: string, skip: number, take: number, codigoRef: string) => Promise<GradeCurricularModel[]>;
    getCurriculumPlansByQuery: (userToken: string, skip: number, take: number, query: string, codigoRef: string) => Promise<GradeCurricularModel[]>;
    logicalDeleteCurriculumPlan: (userToken: string, codigo: string) => Promise<boolean>;
    modifyCurriculumPlan: (userToken: string, gradeCurricularModel: GradeCurricularModel) => Promise<boolean>;
}