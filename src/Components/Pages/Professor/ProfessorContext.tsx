import { createContext, useState } from "react";
import { PessoaModel } from "../../../Models/Objects/PessoaModel";
import PersonRepository from "../../../Repository/Implementations/PersonRepository";
import FormacaoAcademicaRepository from "../../../Repository/Implementations/FormacaoAcademicaRepository";
import FormacaoModel from "../../../Models/Objects/FormacaoModel";
import CargoRepository from "../../../Repository/Implementations/CargoRepository";
import CargosModel from "../../../Models/Objects/CargosModel";
import AreaAtuacaoRepository from "../../../Repository/Implementations/AreaAtuacaoRepository";
import AreaAtuacaoModel from "../../../Models/Objects/AreaAtuacaoModel";
import ProfessorModel from "../../../Models/Objects/ProfessorModel";
import { ProfessorRepository } from "../../../Repository/Implementations/ProfessorRepository";


interface IProfessorContext {
    getPersons: (name_Or_CPF: string, skip: number, take: number) => Promise<PessoaModel[]>;
    countPersons: (name_Or_CPF?: string) => Promise<number>;
    getFormacao: (nomeFormacao: string, skip: number, take: number) => Promise<FormacaoModel[]>;
    countFormacao: (nomeFormacao: string) => Promise<number>;
    getFuncao: (skip: number, take: number, nomeFuncao?: string) => Promise<CargosModel[]>;
    countFuncao: (nomeFuncao?: string) => Promise<number>;
    getAreaAtuacao: (nomeArea: string, skip: number, take: number) => Promise<AreaAtuacaoModel[]>;
    countAreaAtuacao: (nomeArea: string) => Promise<number>;

}

export const ProfessorContext = createContext<IProfessorContext | undefined>(undefined);

const ProfessorContextProvider = (props: any) => {
    var userToken = sessionStorage.getItem("userToken") ?? "";
    const [professor, setProfessor] = useState<ProfessorModel | undefined>(undefined)

    /* ------------------------------------------ Pessoa ------------------------------------------  */

    const getPersons = async (name_Or_CPF: string, skip: number, take: number) => {
        let query = (() => {
            if (name_Or_CPF) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "$or": [
                        { "nome": { "$regex": `${name_Or_CPF}`, '$options': 'i' } },
                        { "CPF": { "$regex": `${name_Or_CPF}`, '$options': 'i' } }
                    ]
                })));
            }
        })();

        let skipValue = skip ? skip : 0;
        let takeValue = take ? take : 9999;

        let result;
        if (query) {
            result = await new PersonRepository().getPersonsByStringQuery(userToken, query, skipValue, takeValue);
        } else {
            result = await new PersonRepository().getPersonList(userToken, skipValue, takeValue);
        }

        return result;
    };

    const countPersons = async (name_Or_CPF?: string) => {
        let query = (() => {
            if (name_Or_CPF) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "$or": [
                        { "nome": { "$regex": name_Or_CPF, '$options': 'i' } },
                        { "CPF": { "$regex": name_Or_CPF, '$options': 'i' } }
                    ]
                })));
            }
        })();

        let result;
        if (query) {
            result = await new PersonRepository().countPersonsByQuery(userToken, query) as number;
        } else {
            result = await new PersonRepository().countPersons(userToken) as number;
        }

        return result;
    };
    /* --------------------------------------------------------------------------------------------  */

    /* ----------------------------------------- Formação -----------------------------------------  */
    const getFormacao = async (nomeFormacao: string, skip: number, take: number) => {
        let query = (() => {
            if (nomeFormacao) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "education": { "$regex": nomeFormacao, '$options': 'i' }
                })));
            }
        })();

        let result;
        if (query) {
            result = await new FormacaoAcademicaRepository().getAcademicBackgroundsByQuery(userToken, skip, take, query) as FormacaoModel[];
        } else {
            result = await new FormacaoAcademicaRepository().getAcademicBackgrounds(userToken, skip, take) as FormacaoModel[];
        }
        return result;
    };

    const countFormacao = async (nomeFormacao: string) => {
        let query = (() => {
            if (nomeFormacao) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "education": { "$regex": nomeFormacao, '$options': 'i' }
                })));
            }
        })();

        let result;
        if (query) {
            result = await new FormacaoAcademicaRepository().countAcademicBackgroundsByQuery(userToken, query) as number;
        } else {
            result = await new FormacaoAcademicaRepository().countAcademicBackgrounds(userToken) as number;
        }
        return result;
    };
    /* --------------------------------------------------------------------------------------------  */

    /* ------------------------------------------ Função ------------------------------------------  */
    const getFuncao = async (skip: number, take: number, nomeFuncao?: string) => {
        let query = (() => {
            if (nomeFuncao) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "position": { "$regex": nomeFuncao, '$options': 'i' }
                })));
            }
        })();

        let result;
        if (query) {
            result = await new CargoRepository().getPositionsByQuery(userToken, skip, take, query) as CargosModel[];
        } else {
            result = await new CargoRepository().getPositions(userToken, skip, take) as CargosModel[];
        }
        return result;
    };

    const countFuncao = async (nomeFuncao?: string) => {
        let query = (() => {
            if (nomeFuncao) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "position": { "$regex": nomeFuncao, '$options': 'i' }
                })));
            }
        })();

        let result;
        if (query) {
            result = await new CargoRepository().countPositionsByQuery(userToken, query) as number;
        } else {
            result = await new CargoRepository().countPositions(userToken) as number;
        }
        return result
    };
    /* --------------------------------------------------------------------------------------------  */

    /* --------------------------------------- Area Atuação ---------------------------------------  */
    const getAreaAtuacao = async (nomeArea: string, skip: number, take: number) => {
        let query = (() => {
            if (nomeArea) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "area": { "$regex": nomeArea, '$options': 'i' }
                })));
            }
        })();

        let result;
        if (query) {
            result = await new AreaAtuacaoRepository().getAreasOfSpecializationByQuery(userToken, skip, take, query) as AreaAtuacaoModel[];
        } else {
            result = await new AreaAtuacaoRepository().getAreasOfSpecialization(userToken, skip, take) as AreaAtuacaoModel[];
        }
        return result;
    };

    const countAreaAtuacao = async (nomeArea: string) => {
        let query = (() => {
            if (nomeArea) {
                return btoa(encodeURIComponent(JSON.stringify({
                    "area": { "$regex": nomeArea, '$options': 'i' }
                })));
            }
        })();

        let result;
        if (query) {
            result = await new AreaAtuacaoRepository().countAreaOfSpecializationByQuery(userToken, query) as number;

        } else {
            result = await new AreaAtuacaoRepository().countAreaOfSpecialization(userToken) as number;
        }
        return result;
    };
    /* --------------------------------------------------------------------------------------------  */

    /* ----------------------------------------- Professor ----------------------------------------  */
    const getProfessor = async (codigo: string) => {
        let result = await new ProfessorRepository().getTeacherById(userToken, codigo);
        return result ?? undefined;
    };

    const deleteProfessor = async (codigo: string) => {
        let result = await new ProfessorRepository().logicalDeleteTeacher(userToken, codigo);
        return result;
    };

    const addProfessor = async (professor: ProfessorModel) => {
        let result = await new ProfessorRepository().addTeacher(userToken, professor);
        return result;
    };

    const alterarProfessor = async (professor: ProfessorModel) => {
        let result = await new ProfessorRepository().modifyTeacher(userToken, professor);
        return result;
    }

    const getProfessores = async (skip: number, take: number) => {
        let result = await new ProfessorRepository().getTeacherList(userToken, skip, take);
        return result;
    }

    const conutProfessores = async () => {
        let result = await new ProfessorRepository().countTeachers(userToken);
        return result;
    }
    /* --------------------------------------------------------------------------------------------  */

    return (
        <ProfessorContext.Provider value={{
            getPersons,
            countPersons,
            getFormacao,
            countFormacao,
            getFuncao,
            countFuncao,
            getAreaAtuacao,
            countAreaAtuacao
        }}>
            {props.children}
        </ProfessorContext.Provider >
    );
}

export default ProfessorContextProvider;