import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'

const Button = ({ text, style, click }) => {
  const [btnStyle, setStyle] = useState(style);

  return (
    <ButtonContainer style={btnStyle} onClick={() => {setStyle({...style, color: colors.white, background: colors.violet});click()}}>
      {text}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  cursor: pointer;
  width: 100px;
  height: 40px;
  background: ${colors.white};
  border-radius: 50px;
  font-family: 'Nunito', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: ${colors.violet};
  display: flex;
  align-items: center;
  justify-content: center;
`
export default Button
