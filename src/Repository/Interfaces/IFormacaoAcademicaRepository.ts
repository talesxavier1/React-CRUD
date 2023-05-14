import FormacaoModel from "../../Models/Objects/FormacaoModel";

export default interface IFormacaoAcademicaRepository {
    addAreaOfSpecialization: (userToken: string, formacaoAcademica: FormacaoModel) => Promise<boolean>
    countAreaOfSpecialization: (userToken: string) => Promise<number>;
    getAreaOfSpecializationById: (userToken: string, codigo: string) => Promise<FormacaoModel | null>;
    getAreasOfSpecialization: (userToken: string, skip: number, take: number) => Promise<FormacaoModel[]>;
    logicalDeleteAreaOfSpecialization: (userToken: string, codigo: string) => Promise<boolean>;
    modifyAreaOfSpecialization: (userToken: string, formacaoAcademica: FormacaoModel) => Promise<boolean>;
}