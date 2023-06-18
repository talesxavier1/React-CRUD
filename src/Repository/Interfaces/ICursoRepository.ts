import CursoModel from "../../Models/Objects/CursoModel"


export default interface ICursoRepository {
    logicalDeleteCourse: (userToken: string, codigo: string) => Promise<boolean>
    addCourse: (userToken: string, curso: CursoModel) => Promise<boolean>
    modifyCourse: (userToken: string, curso: CursoModel) => Promise<boolean>
    getCourseList: (userToken: string, skip: number, take: number, codigoRef?: string) => Promise<CursoModel[]>
    getCourseByStringQuery: (userToken: string, skip: number, take: number, query: string, codigoRef?: string) => Promise<CursoModel[]>
    countCourseByQuery: (userToken: string, query: string) => Promise<number>
    countCourse: (userToken: string, codigoRef?: string) => Promise<number>
    getCourseById: (userToken: string, codigo: string) => Promise<CursoModel | undefined>
}