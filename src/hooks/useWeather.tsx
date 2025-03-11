//HOOK WEATHER
import { useMemo, useState } from "react"
import axios from "axios"
import * as v from "valibot"
import { SearchType, GeoAPIType } from "../types"

//Valibot Esquema
//Permite validar datos utilizando esquemas, garantizando la seguridad de tipos en compilación y ejecución
const WeatherSchema = v.object({
    name: v.string(),
    main: v.object({
        temp: v.number(),
        temp_max: v.number(),
        temp_min: v.number()
    })
})
export type WatherAPIType = v.InferOutput<typeof WeatherSchema>;

//Constantes
const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

//Hook
function useWeather() {
    //State
    const [ weather, setWeather ] = useState<WatherAPIType>(initialState);
    const [ loading, setLoading ] = useState(false);
    const [ notFound, setNotFound ] = useState(false);

    //Funciones
    const hasWeatherData = useMemo(() => weather.name, [weather]);

    //Request
    const fetchWeather = async (search : SearchType) => {
        //VITE ENVIROMENT VARIABLE (https://vite.dev/guide/env-and-mode)
        const appId = import.meta.env.VITE_API_KEY;

        setWeather(initialState);
        setLoading(true);
        setNotFound(false);

        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

            //CASTEO
            const { data } = await axios<GeoAPIType[]>(geoUrl);

            if(!data[0]) {
                setNotFound(true);
                return;
            }

            const lat = data[0].lat
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

            //ESQUEMA
            //Destructuración y Renombrado en una sola línea
            const {data : weatherResult} = await axios(weatherUrl);
            //valibot.parse(Esquema, Consulta): Valida los tipos y devuelve la estructura del Esquema
            //En caso de error arroja una Excepción
            const result = v.parse(WeatherSchema, weatherResult);
            setWeather(result);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //Retorno
    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}

export default useWeather;