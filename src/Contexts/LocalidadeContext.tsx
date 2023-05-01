import { createContext, useState } from "react";
import { EstadoModel, MunicipioModel, PaisModel } from "../Models/Objects/LocalidadesModels";
import LocalidadesRepository from "../Repository/Implementations/LocalidadesRepository";

interface ILocalidadeContext {
    pais: null | PaisModel;
    paises: [] | PaisModel[];
    setPais: (value: PaisModel) => void;
    setPaises: (value: PaisModel[]) => void;
    buscarPaises: (codigo?: string) => Promise<PaisModel[]>;

    estado: null | EstadoModel;
    estados: [] | EstadoModel[];
    setEstado: (value: EstadoModel) => void
    setEstados: (value: EstadoModel[]) => void
    buscarEstados: (codigo?: string, codigoRef?: string) => Promise<EstadoModel[]>

    municipio: null | MunicipioModel;
    municipios: [] | MunicipioModel[];
    setMunicipio: (value: MunicipioModel) => void
    setMunicipios: (value: MunicipioModel[]) => void
    buscarMunicipios: (codigo?: string, codigoRef?: string) => Promise<MunicipioModel[]>
}

export const localidadeContext = createContext<ILocalidadeContext | null>(null);

const LocalidadeProvaider = (props: any) => {
    const [pais, setPais] = useState<null | PaisModel>(null);
    const [paises, setPaises] = useState<PaisModel[]>([]);
    const [estado, setEstado] = useState<null | EstadoModel>(null);
    const [estados, setEstados] = useState<EstadoModel[]>([]);
    const [municipio, setMunicipio] = useState<null | MunicipioModel>(null);
    const [municipios, setMunicipios] = useState<MunicipioModel[]>([]);
    const userToken = sessionStorage.getItem("userToken") ?? "";


    const buscarPaises = async (codigo?: string) => {
        let result = await new LocalidadesRepository().getCountries(userToken);
        return result;
    }

    const buscarEstados = async (codigo?: string, codigoRef?: string) => {
        let result = await new LocalidadesRepository().getStates(userToken, codigo, codigoRef);
        return result;
    }

    const buscarMunicipios = async (codigo?: string, codigoRef?: string) => {
        let result = await new LocalidadesRepository().getCities(userToken, codigo, codigoRef);
        return result;
    }

    return (
        <localidadeContext.Provider value={{
            pais,
            paises,
            estado,
            estados,
            municipio,
            municipios,
            setPais,
            setPaises,
            setEstado,
            setEstados,
            setMunicipio,
            setMunicipios,
            buscarPaises,
            buscarEstados,
            buscarMunicipios
        }}>
            {props.children}
        </localidadeContext.Provider>
    );

}


export default LocalidadeProvaider;