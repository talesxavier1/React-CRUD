import ILinguasFaladasModel from "../Interfaces/ILinguasFaladasModel";

export default class LinguasFaladasModel implements ILinguasFaladasModel {
    codigo!: string;
    codigoRef!: string;
    languageName!: string;
    proficiencyLevel!: string;
    practicalApplications!: string;
}