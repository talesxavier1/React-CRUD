import { GUID } from "../../utils/GUID";
import ITurmaModel from "../Interfaces/ITurmaModel";

export default class TurmaModel implements ITurmaModel {
    "codigo"!: string
    "classCode"!: string
    "schoolYear"!: number
    "classStatus"!: string
    "gradeLevel"!: string
    "classShift"!: string
    "responsibleTeacher"!: string
    "responsibleTeacherID"!: string
    "observations"!: string
    "classStartDate"!: string
    "classEndtDate"!: string
    "totalWorkload"!: number
    "supplementaryWorkload"!: number

    constructor() {
        this.codigo = GUID.getGUID();
    }
}