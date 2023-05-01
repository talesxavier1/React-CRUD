import { User } from "../../Models/Interfaces/UserModel"

export default interface IUserRepository {
    getUserByEmailAndPass: (email: string, password: string) => Promise<User | undefined>
    validateUserToken: (token: string) => Promise<Boolean>
}