import { User } from "../../Models/Interfaces/UserModel";
import IUserRepository from "../Interfaces/IUserRepository";
import { RequestModel } from '../../utils/Request';
import axios from "axios";


export default class UserRepository implements IUserRepository {

    getUserByEmailAndPass = async (email: string, password: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/User/getUserByEmailAndPass?Email=${email}&Password=${password}`
        let responseReturn: any;
        await axios({
            url: url,
            method: "GET",
        }).then((response) => {
            responseReturn = response.data.user;
        }, (error) => {
            console.error(error);
        });
        return responseReturn;
    }

    validateUserToken = async (token: string) => {
        let url = `${import.meta.env.VITE_REACT_APP_API}/User/ValidateUserToken?token=${token}`
        let responseReturn: any;
        await axios({
            url: url,
            method: "GET",
        }).then((response) => {
            responseReturn = response.data;
        }, (error) => {
            console.error(error);
        });
        if (responseReturn && responseReturn.status == 0) {
            return responseReturn.isValid;
        } else {
            return false;
        }
    }

}
