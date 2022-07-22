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
          <Text style={{ width: '404px', height: '74px' }}>
            A convenient application for creating polls based on NEAR.
          </Text>
          <Button style={{ width: 200 }} text='Get started' click={login} />
        </TitleContainer>
      </Container>
      <ContentContainer>
        <SecondTitleContainer>
          <SecondTitle>Creating a poll</SecondTitle>
        </SecondTitleContainer>
        <StepsContainer>
          <Step style={{ marginLeft: '11vw' }}>
            <StepTitle>Step 1</StepTitle>
            <Text style={{ color: colors.violet }}>
              Log in to your account on NEAR
            </Text>
          </Step>
        </StepsContainer>

        <StepsContainer
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginBottom: '40vh',
          }}
        >
          <Step style={{ marginRight: '3vw' }}>
            <StepTitle>Step 2</StepTitle>
            <Text style={{ color: colors.violet }}>
              Create a poll using NEAR
            </Text>
          </Step>
        </StepsContainer>

        <StepsContainer>
          <Step style={{ marginLeft: '11vw' }}>
            <StepTitle>Step 3</StepTitle>
            <Text style={{ color: colors.violet }}>
              Vote and share with your friends
            </Text>
          </Step>
        </StepsContainer>

        <DevelopersContainer>
          <Text>
            Developers
            <br /> Mileshko Olesia, Reut Ksenia
          </Text>
        </DevelopersContainer>
      </ContentContainer>
    </>
  )
}

const Container = styled.div`
  margin: 5vh 10vw;
  height: 130vh;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 55px;
  align-items: center;
  margin-bottom: 30vh;
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
`

const ContentContainer = styled.div`
  height: 300vh;
  margin: 5vh 10vw;
`
const SecondTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SecondTitle = styled.p`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 55px;
  line-height: 75px;
  color: ${colors.violet};
  margin-top: 10vh;
  margin-bottom: 18vh;
`

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 48vh;
`
const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StepTitle = styled.p`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 75px;
  color: ${colors.violet};
`

const DevelopersContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 95vh;
`

export default Main
