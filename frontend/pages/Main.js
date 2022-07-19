import React from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Button from '../components/Button'

const Main = ({ login }) => {
  return (
    <>
      <Container>
        <HeaderContainer>
          <Logo>VotingApp</Logo>
          <Button text='Log in' click={login} />
        </HeaderContainer>

        <TitleContainer>
          <Title>Welcome to Voting App with NEAR</Title>
          <Text>
            A convenient application for creating polls based on NEAR.
          </Text>
          <Button style={{ width: 200 }} text='Get started' click={login} />
        </TitleContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 55px 195px;
  height: 100vh;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 55px;
  align-items: center;
  margin-bottom: 214px;
`

const Logo = styled.span`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 55px;
  color: ${colors.white};
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 35px;
`
const Title = styled.p`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 55px;
  line-height: 75px;
  color: ${colors.white};
  width: 641px;
  height: 150px;
`

const Text = styled.p`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 152.4%;
  color: ${colors.white};
  width: 404px;
  height: 74px;
`

const ContentContainer = styled.div``

export default Main
