//COMPONENT WEATHER-DETAIL
import { formatTemperature } from "./helpers"
import type { WatherAPIType } from "./hooks/useWeather"
import styles from "./modules_css/WeatherDetail.module.css" 

//Type
type WeatherDetailProps = {
    weather: WatherAPIType
}

function WeatherDetail( {weather} : WeatherDetailProps ) {

    //---VIEW---//
    return (
        <div className={styles.containerSup}>
            <div className={styles.container}>
                <h2>{weather.name}</h2>
                <p className={styles.current}>{ formatTemperature(weather.main.temp).toFixed(2) }&deg;C</p>
                <div className={styles.temperatures}>
                    <p>Min: <span>{ formatTemperature(weather.main.temp_min).toFixed(0) }&deg;C</span></p>
                    <p>Max: <span>{ formatTemperature(weather.main.temp_max).toFixed(0) }&deg;C</span></p>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetail