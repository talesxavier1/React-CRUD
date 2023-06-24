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
import ExperienciaDeTrabalhoModel from "../../../Models/Objects/ExperienciaDeTrabalhoModel";
import ExperienciaProficionalRepository from "../../../Repository/Implementations/ExperienciaProficionalRepository";
import CursoRepository from "../../../Repository/Implementations/CursoRepository";
import CursoModel from "../../../Models/Objects/CursoModel";
import LinguasFaladasRepository from "../../../Repository/Implementations/LinguasFaladasRepository";
import LinguasFaladasModel from "../../../Models/Objects/LinguasFaladasModel";


interface IProfessorContext {
    getPersons: (name_Or_CPF: string, skip: number, take: number) => Promise<PessoaModel[]>;
    countPersons: (name_Or_CPF?: string) => Promise<number>;
    getFormacao: (nomeFormacao: string, skip: number, take: number) => Promise<FormacaoModel[]>;
    countFormacao: (nomeFormacao: string) => Promise<number>;
    getFuncao: (skip: number, take: number, nomeFuncao?: string) => Promise<CargosModel[]>;
    countFuncao: (nomeFuncao?: string) => Promise<number>;
    getAreaAtuacao: (nomeArea: string, skip: number, take: number) => Promise<AreaAtuacaoModel[]>;
    countAreaAtuacao: (nomeArea: string) => Promise<number>;
    getProfessor: (codigo: string) => Promise<ProfessorModel | undefined>
    deleteProfessor: (codigo: string) => Promise<boolean>;
    addProfessor: (professor: ProfessorModel) => Promise<boolean>;
    alterarProfessor: (professor: ProfessorModel) => Promise<boolean>;
    getProfessores: (skip: number, take: number) => Promise<ProfessorModel[]>;
    conutProfessores: () => Promise<number>;
    getExperiencias: (skip: number, take: number, codigoRef?: string) => Promise<ExperienciaDeTrabalhoModel[]>;
    deleteExperiencia: (codigo: string) => Promise<boolean>;
    addExperiencia: (experiencia: ExperienciaDeTrabalhoModel) => Promise<boolean>;
    alterarExperiencia: (experiencia: ExperienciaDeTrabalhoModel) => Promise<boolean>
    countExperiencias: (codigoRef?: string) => Promise<number>;
    getCursos: (skip: number, take: number, codigoRef?: string) => Promise<CursoModel[]>
    deleteCurso: (codigo: string) => Promise<boolean>
    addCurso: (curso: CursoModel) => Promise<boolean>
    alterarCurso: (curso: CursoModel) => Promise<boolean>
    countCursos: (codigoRef?: string) => Promise<number>

    getIdiomas: (skip: number, take: number, codigoRef?: string) => Promise<LinguasFaladasModel[]>
    deleteIdioma: (codigo: string) => Promise<boolean>
    addIdioma: (lingua: LinguasFaladasModel) => Promise<boolean>
    alterarIdioma: (lingua: LinguasFaladasModel) => Promise<boolean>
    countIdioma: (codigoRef?: string) => Promise<number>

    professor: ProfessorModel | undefined;
    setProfessor: (professor: ProfessorModel) => void;

    experiencias: { experiencias: ExperienciaDeTrabalhoModel[], count: number } | undefined
    setExperiencias: (prop: { experiencias: ExperienciaDeTrabalhoModel[]; count: number; } | undefined) => void;

    cursos: { cursos: CursoModel[]; count: number; } | undefined
    setCursos: (prop: { cursos: CursoModel[]; count: number; } | undefined) => void;

    idiomas: { cursos: LinguasFaladasModel[]; count: number; } | undefined
    setIdiomas: (prop: { cursos: LinguasFaladasModel[]; count: number; } | undefined) => void;
};

export const ProfessorContext = createContext<IProfessorContext | undefined>(undefined);

const ProfessorContextProvider = (props: any) => {
    var userToken = sessionStorage.getItem("userToken") ?? "";
    const [professor, setProfessor] = useState<ProfessorModel | undefined>();
    const [experiencias, setExperiencias] = useState<{ experiencias: ExperienciaDeTrabalhoModel[], count: number } | undefined>();
    const [cursos, setCursos] = useState<{ cursos: CursoModel[], count: number } | undefined>();
    const [idiomas, setIdiomas] = useState<{ cursos: LinguasFaladasModel[], count: number } | undefined>();


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

    /* ---------------------------------------- Experiencias --------------------------------------  */
    const getExperiencias = async (skip: number, take: number, codigoRef?: string) => {
        let result = await new ExperienciaProficionalRepository().getWorkExperienceList(userToken, skip, take, codigoRef);
        return result;
    };

    const deleteExperiencia = async (codigo: string) => {
        let result = await new ExperienciaProficionalRepository().logicalDeleteWorkEperience(userToken, codigo);
        return result;
    };

    const addExperiencia = async (experiencia: ExperienciaDeTrabalhoModel) => {
        let result = await new ExperienciaProficionalRepository().addWorkExperience(userToken, experiencia);
        return result;
    };

    const alterarExperiencia = async (experiencia: ExperienciaDeTrabalhoModel) => {
        let result = await new ExperienciaProficionalRepository().modifyWorkExperience(userToken, experiencia);
        return result;
    };

    const countExperiencias = async (codigoRef?: string) => {
        let result = await new ExperienciaProficionalRepository().countWorkExperiences(userToken, codigoRef);
        return result;
    }
    /* --------------------------------------------------------------------------------------------  */

    /* ------------------------------------------- Cursos -----------------------------------------  */
    const getCursos = async (skip: number, take: number, codigoRef?: string) => {
        let result = await new CursoRepository().getCourseList(userToken, skip, take, codigoRef);
        return result;
    };

    const deleteCurso = async (codigo: string) => {
        let result = await new CursoRepository().logicalDeleteCourse(userToken, codigo);
        return result;
    };

    const addCurso = async (curso: CursoModel) => {
        let result = await new CursoRepository().addCourse(userToken, curso);
        return result;
    };

    const alterarCurso = async (curso: CursoModel) => {
        let result = await new CursoRepository().modifyCourse(userToken, curso);
        return result;
    };

    const countCursos = async (codigoRef?: string) => {
        let result = await new CursoRepository().countCourse(userToken, codigoRef);
        return result;
    }
    /* --------------------------------------------------------------------------------------------  */

    /* ------------------------------------------- Idiomas ----------------------------------------  */
    const getIdiomas = async (skip: number, take: number, codigoRef?: string) => {
        let result = await new LinguasFaladasRepository().getLinguaList(userToken, skip, take, codigoRef);
        return result;
    };

    const deleteIdioma = async (codigo: string) => {
        let result = await new LinguasFaladasRepository().logicalDeleteLingua(userToken, codigo);
        return result;
    };

    const addIdioma = async (lingua: LinguasFaladasModel) => {
        let result = await new LinguasFaladasRepository().addLingua(userToken, lingua);
        return result;
    };

    const alterarIdioma = async (lingua: LinguasFaladasModel) => {
        let result = await new LinguasFaladasRepository().modifyLingua(userToken, lingua);
        return result;
    };

    const countIdioma = async (codigoRef?: string) => {
        let result = await new LinguasFaladasRepository().countLingua(userToken, codigoRef);
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
            countAreaAtuacao,
            getProfessor,
            deleteProfessor,
            addProfessor,
            alterarProfessor,
            getProfessores,
            conutProfessores,
            getExperiencias,
            deleteExperiencia,
            addExperiencia,
            alterarExperiencia,
            countExperiencias,
            getCursos,
            deleteCurso,
            addCurso,
            alterarCurso,
            countCursos,
            getIdiomas,
            deleteIdioma,
            addIdioma,
            alterarIdioma,
            countIdioma,

            setProfessor,
            professor,

            setExperiencias,
            experiencias,

            cursos,
            setCursos,

            idiomas,
            setIdiomas,
        }}>
            {props.children}
        </ProfessorContext.Provider >
    );
}

export default ProfessorContextProvider;