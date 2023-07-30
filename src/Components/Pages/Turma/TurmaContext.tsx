import { ReactNode, createContext, useContext, useState } from "react";
import TurmaModel from "../../../Models/Objects/TurmaModel";
import { TurmaRepository } from "../../../Repository/Implementations/TurmaRepository";


interface ITurmaContext {
    /* ============================ TURMA ============================ */
    addTurma: (turmaModel: TurmaModel) => Promise<boolean>;
    countTurma: (query?: string) => Promise<number>;
    getTurma: (codigo: string) => Promise<TurmaModel | null>
    getTurmaList: (skip: number, take: number, query?: string) => Promise<TurmaModel[]>
    deleteTurma: (codigo: string) => Promise<boolean>
    updateTurma: (turmaModel: TurmaModel) => Promise<boolean>

    turma: TurmaModel | undefined
    setTurma: (turma: TurmaModel) => void;

    turmas: { values: TurmaModel[], count: number } | undefined;
    setTurmas: (values: TurmaModel[], count: number) => void
    /* =============================================================== */
}

const TurmaContext = createContext<ITurmaContext | undefined>(undefined);

const TurmaContextProvider = ({ children }: { children: ReactNode }) => {
    const userToken = sessionStorage.getItem("userToken") ?? "";
    const [turma, setTurma] = useState<TurmaModel | undefined>();
    const [turmas, setTurmas] = useState<{ values: TurmaModel[], count: number } | undefined>();

    const providerValues: ITurmaContext = {
        async addTurma(turmaModel: TurmaModel): Promise<boolean> {
            let result: boolean = await new TurmaRepository().addClass(userToken, turmaModel);
            return result;
        },

        async countTurma(query?: string): Promise<number> {
            let result: number;
            if (query) {
                result = await new TurmaRepository().countClassesByQuery(userToken, query);
            } else {
                result = await new TurmaRepository().countClasses(userToken);
            }
            return result;
        },

        async getTurma(codigo: string): Promise<TurmaModel | null> {
            let result: TurmaModel | null = await new TurmaRepository().getClassById(userToken, codigo);
            return result;
        },

        async getTurmaList(skip: number, take: number, query?: string | undefined): Promise<TurmaModel[]> {
            let result: TurmaModel[];
            if (query) {
                result = await new TurmaRepository().getClassByQuery(userToken, skip, take, query);
            } else {
                result = await new TurmaRepository().getClassList(userToken, skip, take);
            }
            return result;
        },

        async deleteTurma(codigo: string): Promise<boolean> {
            let result: boolean = await new TurmaRepository().logicalDeleteClass(userToken, codigo);
            return result;
        },

        async updateTurma(turmaModel: TurmaModel): Promise<boolean> {
            let result: boolean = await new TurmaRepository().modifyClass(userToken, turmaModel);
            return result;
        },

        turma: turma,
        setTurma(turma: TurmaModel): void {
            setTurma(turma);
        },

        turmas: turmas,
        setTurmas(values: TurmaModel[], count: number): void {
            setTurmas({ values: values, count: count })
        }
    }

    return (
        <TurmaContext.Provider value={providerValues}>
            {children}
        </TurmaContext.Provider >
    );
}

const useTurmaContext = () => {
    const context = useContext(TurmaContext);
    if (!context) {
        throw new Error('useTurmaContext deve ser usado dentro de um TurmaContextProvider');
    }
    return context;
}

export { useTurmaContext, TurmaContextProvider }


