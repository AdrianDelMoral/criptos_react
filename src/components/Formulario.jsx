import styled from "@emotion/styled"
import SelectMonedas from "../hooks/useSelectMonedas"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { monedas } from '../data/monedas'
import { useEffect } from "react"

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

const Formulario = () => {

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)

  useEffect(() => {
    const consultarAPI = async () => {
      // URL que devolverá un JSON
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

      // Fetch a la URL
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      console.log(resultado.Data);
    }

    consultarAPI();
  }, [])
  
  
  return (
    <form>
      <SelectMonedas />
      {moneda}

      <InputSubmit
        type="submit" 
        value="Cotizar" 
      />
    </form>
  )
}

export default Formulario