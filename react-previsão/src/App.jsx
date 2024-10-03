import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/weatherInformations/weatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'

function App() {
  // weather variavel e função setWeather
  const [weather, setWeather] = useState()

  // weather5Days variavel e função setWeather5Days
  const [weather5Days, setWeather5Days] = useState()

  const inputRef = useRef()

  // função de buscar a cidade, com o metódo assíncrono 
  async function searchCity() {
    // Valor do input
    const city = inputRef.current.value

    // chave api
    const key = "1ca24cd63c90a9d848993323e1dba5f3"

    // url que será buscada na pesquisa de API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`

    // url que será buscada da previsão daqui 5 dias
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    // utilizando a const com a variavel "data" nós acessamos a biblioteca axios no metódo get para buscar a url passada
    const apiInfo = await axios.get(url)
    const apiInfo5Days = await axios.get(url5Days)

    setWeather(apiInfo.data)
    setWeather5Days(apiInfo5Days.data)
  }

  return (
    <div className='container'>
      <h1>Previsão do tempo</h1>
      <input type="text" placeholder='Digite o nome da cidade' ref={inputRef} />
      <button onClick={searchCity} type='button'>Buscar</button>

      { weather && <WeatherInformations weather={weather}/>}
      { weather5Days && <WeatherInformations5Days weather5Days={weather5Days}/>}
    </div>
  )
}

export default App
