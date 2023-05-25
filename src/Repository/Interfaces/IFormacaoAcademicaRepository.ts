import FormacaoModel from "../../Models/Objects/FormacaoModel";

export default interface IFormacaoAcademicaRepository {
    addAcademicBackground: (userToken: string, formacaoAcademica: FormacaoModel) => Promise<boolean>
    countAcademicBackgrounds: (userToken: string, query?: string) => Promise<number>;
    getAcademicBackgroundById: (userToken: string, codigo: string) => Promise<FormacaoModel | null>;
    getAcademicBackgrounds: (userToken: string, skip: number, take: number, query?: string) => Promise<FormacaoModel[]>;
    logicalDeleteAcademicBackground: (userToken: string, codigo: string) => Promise<boolean>;
    modifyAcademicBackground: (userToken: string, formacaoAcademica: FormacaoModel) => Promise<boolean>;
}

