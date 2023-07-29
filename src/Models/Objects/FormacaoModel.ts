import { IFormacao } from "../Interfaces/IFormacao";

export default class FormacaoModel implements IFormacao {
    codigo!: string;
    education!: string;
}