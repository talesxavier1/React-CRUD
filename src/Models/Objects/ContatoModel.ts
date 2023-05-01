import { IContatoModel } from "../Interfaces/IContatoModel";

export class ContatoModel implements IContatoModel {
    codigo!: string;
    codigoRef!: string;
    nomeContato!: string;
    email!: string;
    telefoneCelular!: string;
    telefoneFixo!: string;
}