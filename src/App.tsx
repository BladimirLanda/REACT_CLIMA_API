//COMPONENT APP
import Alert from "./Alert";
import Form from "./Form"
import useWeather from "./hooks/useWeather"
import styles from "./modules_css/App.module.css" 
import Spinner from "./Spinner";
import WeatherDetail from "./WeatherDetail";

function App() {
  //State
  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather();

  //---VIEW---/
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Sin Resultados</Alert>}
      </div>
    </>
  )
}

export default App
