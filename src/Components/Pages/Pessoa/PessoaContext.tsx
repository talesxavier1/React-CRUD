import { createContext, useState } from "react";
import { IPessoaModel } from '../../../Models/Interfaces/IPessoaModel';
import PersonRepository from "../../../Repository/Implementations/PersonRepository";
import ContatosRepository from "../../../Repository/Implementations/ContatosRepository";

import { IEnderecoModel } from "../../../Models/Interfaces/IEnderecoModel";
import { IContatoModel } from "../../../Models/Interfaces/IContatoModel";
import { PessoaModel } from "../../../Models/Objects/PessoaModel";
import { ContatoModel } from "../../../Models/Objects/ContatoModel";
import { EnderecoModel } from "../../../Models/Objects/EnderecoModel";
import EnderecoRepository from "../../../Repository/Implementations/EnderecoRepository";


interface IPessoaContext {
    pessoa: PessoaModel
    contatos: IContatoModel[]
    enderecos: IEnderecoModel[]
    setPessoa: (pessoa: PessoaModel) => void
    setContatos: (contatos: ContatoModel[]) => void
    setEnderecos: (enderecos: EnderecoModel[]) => void

    deleteContato: (codigo: string) => Promise<boolean>
    deletePessoa: (codigo: string) => Promise<boolean>
    deleteEndereco: (codigo: string) => Promise<boolean>
    atualizarEndereco: (endereco: EnderecoModel) => Promise<boolean>
    addEndereco: (endereco: EnderecoModel) => Promise<boolean>
    atualizarContato: (contato: ContatoModel) => Promise<boolean>
    addContato: (contato: ContatoModel) => Promise<boolean>
    modificarPessoa: (pessoa: PessoaModel) => Promise<boolean>
    addPessoa: (pessoa: PessoaModel) => Promise<boolean>
    countPessoas: () => Promise<number>
    countContatos: (codigoRef: string) => Promise<number>
    countEnderecos: (codigoRef: string) => Promise<number>
    buscarPessoas: (skip: number, take: number) => Promise<PessoaModel[]>
    buscarPessoa: (codigo: string) => Promise<IPessoaModel | undefined>
    buscarContatos: (codigoRef: string, skip: number, take: number) => Promise<IContatoModel[] | []>
    buscarEnderecos: (codigoRef: string, skip: number, take: number) => Promise<IEnderecoModel[] | []>
}


export const PessoaContext = createContext<IPessoaContext | undefined>(undefined);

const PessoaContextProvider = (props: any) => {
    var userToken = sessionStorage.getItem("userToken") ?? "";

    const [pessoa, setPessoa] = useState<PessoaModel>(new PessoaModel());
    const [contatos, setContatos] = useState<ContatoModel[]>([]);
    const [enderecos, setEnderecos] = useState<EnderecoModel[]>([]);

    const buscarPessoas = async (skip: number, take: number) => {
        let result = await new PersonRepository().getPersonList(userToken, skip, take);
        return result;
    }

    /* ------------------------------------------ Pessoa ------------------------------------------  */
    const countPessoas = async () => {
        let result = await new PersonRepository().countPersons(userToken);
        return result;
    }

    const buscarPessoa = async (codigo: string) => {
        let result = await new PersonRepository().getPersonById(userToken, codigo);
        return result;
    }

    const addPessoa = async (pessoa: PessoaModel) => {
        let result = await new PersonRepository().addPerson(userToken, pessoa);
        return result;
    }

    const modificarPessoa = async (pessoa: PessoaModel) => {
        let result = await new PersonRepository().modifyPerson(userToken, pessoa);
        return result;
    }

    const deletePessoa = async (codigo: string) => {
        let result = await new PersonRepository().logicalDeletePerson(userToken, codigo);
        return result;
    }
    /* --------------------------------------------------------------------------------------------  */

    /* ----------------------------------------- Contatos -----------------------------------------  */
    const buscarContatos = async (codigoRef: string, skip: number, take: number) => {
        let result = await new ContatosRepository().getContacts(userToken, skip, take, codigoRef);
        return result;
    }

    const countContatos = async (codigoRef: string) => {
        let result = await new ContatosRepository().countContacts(userToken, codigoRef);
        return result;
    }

    const atualizarContato = async (contato: ContatoModel) => {
        let result = await new ContatosRepository().modifyContact(userToken, contato);
        return result;
    }

    const addContato = async (contato: ContatoModel) => {
        let result = await new ContatosRepository().addContact(userToken, contato);
        return result;
    }

    const deleteContato = async (codigo: string) => {
        let result = await new ContatosRepository().logicallyDeleteContact(userToken, codigo);
        return result;
    }
    /* --------------------------------------------------------------------------------------------  */

    /* ----------------------------------------- Enderecos ----------------------------------------  */
    const buscarEnderecos = async (codigoRef: string, skip: number, take: number) => {
        let result = await new EnderecoRepository().getAddresses(userToken, skip, take, codigoRef);
        return result;
    }

    const countEnderecos = async (codigoRef: string) => {
        let result = await new EnderecoRepository().countAddresses(userToken, codigoRef);
        return result;
    }

    const atualizarEndereco = async (endereco: EnderecoModel) => {
        let result = await new EnderecoRepository().modifyAddress(userToken, endereco);
        return result;
    }

    const addEndereco = async (endereco: EnderecoModel) => {
        let result = await new EnderecoRepository().addAddress(userToken, endereco);
        return result;
    }

    const deleteEndereco = async (codigo: string) => {
        let result = await new EnderecoRepository().logicallyDeleteAddress(userToken, codigo);
        return result;
    }
    /* --------------------------------------------------------------------------------------------  */

    return (
        <PessoaContext.Provider value={{
            pessoa,
            contatos,
            enderecos,
            setPessoa,
            setContatos,
            setEnderecos,

            deleteContato,
            deletePessoa,
            deleteEndereco,
            addEndereco,
            atualizarEndereco,
            addContato,
            atualizarContato,
            modificarPessoa,
            addPessoa,
            buscarPessoa,
            countPessoas,
            countContatos,
            countEnderecos,
            buscarPessoas,
            buscarContatos,
            buscarEnderecos,
        }}>
            {props.children}
        </PessoaContext.Provider >
    );
}

export default PessoaContextProvider;