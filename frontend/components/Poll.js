import React from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import start from '../assets/img/startCircle.svg'
import end from '../assets/img/endCircle.svg'
import wait from '../assets/img/waitCircle.svg'

const Poll = ({ name, status, style, click }) => {
  return (
    <Container style={style} onClick={click}>
      <NamePoll>{name}</NamePoll>
      {status === 'start' && (
        <img src={start} style={{ height: 20, width: 20 }} />
      )}
      {status === 'end' && <img src={end} style={{ height: 20, width: 20 }} />}
      {status === 'wait' && (
        <img src={wait} style={{ height: 20, width: 20 }} />
      )}
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${colors.white};
  border-radius: 100px;
  height: 45px;
  padding: 0px 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.38) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  border: none;
  :hover {
    background: none;
    border: 1px solid ${colors.white};
  }
`
const NamePoll = styled.span`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  color: ${colors.white};
`
export default Poll
