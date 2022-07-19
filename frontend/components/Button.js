import React from 'react';
import styled from 'styled-components';
import colors from '../assets/constants/colors';

const Button = ({ text, style, click }) => {
  return (
    <ButtonContainer style={style} onClick={click}>
      {text}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  cursor: pointer;
  width: 127px;
  height: 53px;
  background: ${colors.white};
  border-radius: 50px;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: ${colors.violet};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Button;
