import { IEstadoModel, IMunicipioModel, IPaisModel } from "../Interfaces/ILocalitiesModels";

export class PaisModel implements IPaisModel {
    codigo!: string;
    localitieType!: string;
    countryAcronym!: string;
    countryName!: string;
    countryIBGECode!: string;
}

export class EstadoModel implements IEstadoModel {
    codigo!: string;
    codigoRef!: string;
    localitieType!: string;
    stateAcronym!: string;
    stateName!: string;
    stateIBGECode!: string;
}

export class MunicipioModel implements IMunicipioModel {
    codigo!: string;
    codigoRef!: string;
    localitieType!: string;
    cityName!: string;
    cityIBGECode!: string;
}

