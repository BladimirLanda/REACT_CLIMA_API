//TYPES
export type CountryType = {
    code: string,
    name: string;
}

export type SearchType = {
    city: string,
    country: string;
}

//INTERFACE (Extensión 'Paste JSON as Code')
//GeoAPIType
export interface GeoAPIType {
    name:         string;
    local_names?: { [key: string]: string };
    lat:          number;
    lon:          number;
    country:      string;
    state:        string;
}