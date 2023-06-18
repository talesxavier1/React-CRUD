import Icurso from "../Interfaces/ICurso";


export default class CursoModel implements Icurso {
    codigo!: string;
    codigoRef!: string;
    courseName!: string;
    educationalInstitution!: string;
    courseLoad!: number;
    startDate!: string | null;
    endDate!: string | null;
    modality!: string;
    financialInvestment!: number;
    descriptions!: string;
}