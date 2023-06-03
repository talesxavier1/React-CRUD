import ProfessorModel from "../../Models/Objects/ProfessorModel"

export default interface IProfessorRepository {
    logicalDeleteTeacher: (userToken: string, codigo: string) => Promise<boolean>
    addTeacher: (userToken: string, professor: ProfessorModel) => Promise<boolean>
    modifyTeacher: (userToken: string, professor: ProfessorModel) => Promise<boolean>
    getTeacherList: (userToken: string, skip: number, take: number) => Promise<ProfessorModel[]>
    getTeacherByQuery: (userToken: string, skip: number, take: number, query: string) => Promise<ProfessorModel[]>
    countTeachersByQuery: (userToken: string, query: string) => Promise<number>
    countTeachers: (userToken: string) => Promise<number>
    getTeacherById: (userToken: string, codigo: string) => Promise<ProfessorModel | undefined>
}