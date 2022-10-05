import React from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'

const Button = ({ text, style, click }) => {
  return (
    <ButtonContainer style={style} onClick={() => click()}>
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
  :hover {
    background: rgba(255, 255, 255, 0);
    border: 1px solid
      ${(props) =>
        props.style?.backgroundColor
          ? props.style?.backgroundColor
          : colors.white};
    color: ${(props) =>
      props.style?.backgroundColor
        ? props.style?.backgroundColor
        : colors.white};
  }
`
export default Button
