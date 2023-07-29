import TurmaModel from "../../Models/Objects/TurmaModel";

export default interface ITurmaRepository {
    addClass: (userToken: string, turmaModel: TurmaModel) => Promise<boolean>;
    countClasses: (userToken: string) => Promise<number>;
    countClassesByQuery: (userToken: string, query: string) => Promise<number>;
    getClassById: (userToken: string, codigo: string) => Promise<TurmaModel | null>;
    getClassList: (userToken: string, skip: number, take: number) => Promise<TurmaModel[]>;
    getClassByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<TurmaModel[]>;
    logicalDeleteClass: (userToken: string, codigo: string) => Promise<boolean>;
    modifyClass: (userToken: string, turmaModel: TurmaModel) => Promise<boolean>;
}

