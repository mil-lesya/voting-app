import React from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import done from '../assets/img/done.svg'
import Button from '../components/Button'

const Modal = ({ handleClose }) => {
  return (
    <Background>
      <Container>
        <TitleContainer>
          <DoneIcon src={done} />
          <Title>The poll was created successfully</Title>
        </TitleContainer>
        <Button
          click={handleClose}
          text='OK'
          style={{
            fontSize: 25,
            backgroundColor: colors.violet,
            color: colors.white,
            height: 50,
          }}
        />
      </Container>
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  cursor: auto;
  background: rgba(63, 69, 72, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 3;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 5px;
  height: 300px;
  width: 400px;
  gap: 25px;
`
const DoneIcon = styled.img`
  height: 100px;
  width: 100px;
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Title = styled.p`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 23px;
  line-height: 30px;
  color: ${colors.violet};
  text-align: center;
  margin-top: 15px;
`

export default Modal
