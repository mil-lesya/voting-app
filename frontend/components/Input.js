import React from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'

const Input = ({ value, style, setValue, placeholder }) => {
  return (
    <Container style={style}>
      <CustomInput
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  border: 1px solid ${colors.white};
  border-radius: 100px;
  height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
`
const CustomInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  color: ${colors.white};
  ::placeholder {
    color: ${colors.placeholder};
  }
`
export default Input
