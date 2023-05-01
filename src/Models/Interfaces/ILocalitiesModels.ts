export interface IPaisModel {
    codigo: string
    localitieType: string
    countryAcronym: string
    countryName: string
    countryIBGECode: string
}

export interface IEstadoModel {
    codigo: string
    codigoRef: string
    localitieType: string
    stateAcronym: string
    stateName: string
    stateIBGECode: string
}

export interface IMunicipioModel {
    codigo: string
    codigoRef: string
    localitieType: string
    cityName: string
    cityIBGECode: string
}

