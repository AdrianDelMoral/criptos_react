import styled from '@emotion/styled'
import { useState } from 'react'

const Resultado = ({resultado}) => {
  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

  return (
    <div>
      <p>El Precio es de: <span>{PRICE}</span></p>
      <p>El Precio más Alto del dia es de: <span>{HIGHDAY}</span></p>
      <p>El Precio más bAJO del dia es de: <span>{LOWDAY}</span></p>
      <p>Variación ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span></p>
      <p>Última Actialización: <span>{LASTUPDATE}</span></p>
    </div>
  )
}

export default Resultado