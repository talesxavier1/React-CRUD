import { createContext, FunctionComponent, useState, ReactNode } from "react";
import { User } from "../Models/Interfaces/UserModel";
import UserRepository from "../Repository/Implementations/UserRepository";

interface IAuthContext {
    // user: User | null,
    login: (email: string, senha: string) => Promise<boolean>
    validateUserToken: (token: string) => Promise<boolean>
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = (props: any) => {
    const userRepository = new UserRepository();

    const login = async (email: string, senha: string) => {
        let result: User | null = await userRepository.getUserByEmailAndPass(email, senha);
        if (result) {
            sessionStorage.setItem("userToken", result.userToken);
            return true;
        } else {
            return false;
        }
    }

    const validateUserToken = async (token: string) => {
        let result: boolean = await userRepository.validateUserToken(token);
        return result
    }


    return (
        <AuthContext.Provider value={{ login, validateUserToken }}>
            {props.children}
        </AuthContext.Provider >
    );
}

export default AuthProvider;