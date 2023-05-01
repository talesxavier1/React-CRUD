import { IEnderecoModel } from "../Interfaces/IEnderecoModel";


export class EnderecoModel implements IEnderecoModel {
    codigo!: string;
    codigoRef!: string;
    cep!: string;
    tipoEndereco!: string;
    rua!: string;
    numero!: string;
    bairro!: string;
    cidade!: string;
    cidadeID!: string;
    codigoIBGECidade!: string;
    estado!: string;
    estadoID!: string;
    codigoIBGEEstado!: string;
}