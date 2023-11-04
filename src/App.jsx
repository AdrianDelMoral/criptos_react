import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCrypto from  './img/imagen-criptos.png'

const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img `
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1 `
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 80px;
  font-size: 34px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [ resultado, setResultado ] = useState({})
  
  // State para spinner
  const [ cargando, setCargando ] = useState(false)

  // Para cuando se guarde una consulta de monedas y cryptomoneda que deseemos
  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      
      const { moneda, cryptomoneda } = monedas      
      const cotizarCrypto = async () => {
        setCargando(true)
        //Hacer que desaparezca la anterior busqueda de cripto y moneda para asi mostrar solo el spinner
        setResultado({})

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`
        
        // Hacemos fetch de la url para obtener los resultados en una variable como json
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        // Controlando la respuesta, en base a la criptomoneda y moneda seleccionada, para que sea dinámica, y no haya que poner a mano el json
        // console.log(resultado.DISPLAY[cryptomoneda][moneda]);
        // Y lo guardamos en el state, para asi usarlo con la variable "resultado"
        setResultado(resultado.DISPLAY[cryptomoneda][moneda]);

        setCargando(false)
      }

      cotizarCrypto()
    }

  }, [monedas])
  
  return (
    <Contenedor>
      <Imagen 
        src={ImagenCrypto} 
        alt='Imagenes Cryptomonedas'
      />
      <div>
        <Heading>Cotiza Cryptomonedas Al Instante</Heading>
        <Formulario 
          setMonedas={setMonedas}
        />
        
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado}/> }
      </div>        
    </Contenedor>
  )
}

export default App
