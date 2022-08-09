import React from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Button from '../components/Button'
import bg1 from '../assets/img/bg1.svg'
import footer from '../assets/img/footer.svg'
import img1 from '../assets/img/img1.svg'
import img2 from '../assets/img/img2.svg'
import img3 from '../assets/img/img3.svg'
import img4 from '../assets/img/img4.svg'
import arrow1 from '../assets/img/arrow1.svg'
import arrow2 from '../assets/img/arrow2.svg'

const Main = ({ login }) => {
  return (
    <>
      <Background src={bg1} alt='background image' />
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
        <Image src={img1} alt='image 1' />
      </Container>
      <ContentContainer>
        <SecondTitleContainer>
          <SecondTitle>Creating a poll</SecondTitle>
        </SecondTitleContainer>
        <ItemContainer>
          <StepsContainer>
            <Step style={{ position: 'relative', left: 0 }}>
              <StepTitle>Step 1</StepTitle>
              <Text style={{ color: colors.violet }}>
                Log in to your account on NEAR
              </Text>
              <img src={img2} alt='image 2' />
            </Step>
          </StepsContainer>
          <Arrow src={arrow1} alt='' />
        </ItemContainer>

        <StepsContainer
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginBottom: 50,
          }}
        >
          <Step style={{ position: 'relative', right: 0 }}>
            <StepTitle>Step 2</StepTitle>
            <Text style={{ color: colors.violet }}>
              Create a poll using NEAR
            </Text>
            <img src={img3} alt='image 3' />
          </Step>
        </StepsContainer>

        <ItemContainer
          style={{
            marginBottom: 120,
          }}
        >
          <StepsContainer>
            <Step style={{ position: 'relative', left: 0 }}>
              <StepTitle>Step 3</StepTitle>
              <Text style={{ color: colors.violet }}>
                Vote and share with your friends
              </Text>
              <img src={img4} alt='image 4 ' />
            </Step>
          </StepsContainer>
          <img src={arrow2} alt='' style={{ height: 244 }} />
        </ItemContainer>

        <ButtonContainer>
          <Button
            text='Get started'
            click={login}
            style={{
              width: 200,
              backgroundColor: colors.violet,
              color: colors.white,
            }}
          />
        </ButtonContainer>
      </ContentContainer>
      <FooterContainer>
        <DevelopersContainer>
          <Text>Developers</Text>
          <Text>Mileshko Olesia, Reut Ksenia</Text>
        </DevelopersContainer>
        <FooterImage src={footer} alt='footer image' />
      </FooterContainer>
    </>
  )
}

const Background = styled.img`
  width: 100%;
  z-index: -1;
  position: absolute;
`
const Container = styled.div`
  padding: 5vh 10vw;
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
  padding: 5vh 10vw;
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
const ItemContainer = styled.div`
  display: flex;
  gap: 12vw;
  position: relative;
  margin-bottom: 50px;
`
const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  flex-direction: column;
  position: absolute;
  bottom: 0px;
  padding: 5vh 10vw;
`
const Image = styled.img`
  position: relative;
  bottom: 250px;
  left: 470px;
`
const Arrow = styled.img`
  position: relative;
  height: 244px;
  top: 300px;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const FooterContainer = styled.div`
  position: absolute;
  width: 100%;
`
const FooterImage = styled.img`
  position: relative;
  width: 100%;
  z-index: -1;
  bottom: -10px;
`
export default Main
