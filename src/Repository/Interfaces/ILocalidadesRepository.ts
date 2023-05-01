import { EstadoModel, MunicipioModel, PaisModel } from "../../Models/Objects/LocalidadesModels";

export default interface ILocalidadesRepository {
    getCountries: (userToken: string, codigo?: string) => Promise<PaisModel[]>
    getStates: (userToken: string, codigo?: string, codigoRef?: string) => Promise<EstadoModel[]>
    getCities: (useToken: string, codigo?: string, codigoRef?: string) => Promise<MunicipioModel[]>
}
