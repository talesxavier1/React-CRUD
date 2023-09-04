import { IGradeCurricularModel } from "../Interfaces/IGradeCurricularModel";

export default class GradeCurricularModel implements IGradeCurricularModel {
    codigo!: string;
    supplementary!: string;
    knowledgeArea!: string;
    knowledgeAreaId!: string;
    curricularComponent!: string;
    curricularComponentId!: string;
    weeklyClasses!: number;
    hourLoad!: number;
}