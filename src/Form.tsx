//COMPONENT FORM
import { ChangeEvent, FormEvent, useState } from "react"
import type { SearchType } from "./types"
import { countries } from "./data/countries"
import Alert from "./Alert"
import styles from "./modules_css/Form.module.css"

//Type
type FormProps = {
    fetchWeather: (search : SearchType) => Promise<void>;
}

function Form( {fetchWeather} : FormProps ) {
    //State
    const [ search, setSearch ] = useState<SearchType>({
        city: '',
        country: ''
    });
    const [ alert, setAlert ] = useState('');

    //Eventos
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios');
            return;
        }

        fetchWeather(search);
    }

    //---VIEW---//
    return (
        <form className={styles.form} onSubmit={ handleSubmit }>
            
            {alert && <Alert>{alert}</Alert>}

            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input 
                type="text"
                id="city"
                name="city"
                placeholder="Ciudad"
                value={search.city}
                onChange={ handleChange }
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select 
                id="country"
                name="country" 
                value={search.country}
                onChange={ handleChange }>
                    <option value="">--- Seleccione un País ---</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value="Consultar Clima" />
        </form>
    )
}

export default Form