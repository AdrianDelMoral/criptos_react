import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

const Formulario = ({setMonedas}) => {
  const [cryptos, setCryptos] = useState([])
  const [error, setError] = useState(false)

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  
  const [ cryptomoneda, SelectCryptomoneda ] = useSelectMonedas('Elige tu Cryptomoneda', cryptos)

  useEffect(() => {
    const consultarAPI = async () => {
      // URL que devolverá un JSON
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

      // Fetch a la URL
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      // Darle forma para extraer los datos que deseamos en el Fetch
      const arrayCryptos = resultado.Data.map(crypto => {

        // Crear Objeto con los datos que estamos deseando sacar de ese fetch
        const objeto = {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName
        }
        return objeto ;
      })
      setCryptos(arrayCryptos)
    }
    consultarAPI();
  }, [])
  
  const handleSubmit= e => {
    e.preventDefault()
    if([moneda, cryptomoneda].includes('')) {
      setError(true)

      return;
    }

    setError(false)
    // Después de comprobar que se ha seleccionado un tipo de cryptomoneda y moneda, válidos. 
    // Se guardarán las cryptomonedas para posteriormente hacer los calculos con ellas
    setMonedas({
      moneda,
      cryptomoneda
    })
  }
  
  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCryptomoneda />

        <InputSubmit
          type="submit" 
          value="Cotizar" 
        />
      </form>
    </>
  )
}

export default Formulario