import React from 'react'
import {
  Link,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import 'regenerator-runtime/runtime'
import styled from 'styled-components'
import colors from './assets/constants/colors'
import './assets/css/global.css'
import bg2 from './assets/img/bg2.svg'
import footer from './assets/img/footer.svg'
import { login, logout } from './assets/js/near/utils'
import Button from './components/Button'
import AllPolls from './pages/AllPolls'
import CreatePoll from './pages/CreatePoll'
import Main from './pages/Main'
import Modal from './pages/Modal'
import MyPolls from './pages/MyPolls'
import NotFound from './pages/NotFound'
import VotedPolls from './pages/VotedPolls'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  let state = location.state
  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <Routes>
          <Route path='/' element={<Main login={login} />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      {location.pathname === '/' && <Navigate to={`/all`} replace />}
      <Background src={bg2} alt='background image' />
      <HeaderContainer>
        <Logo>Hello, {accountId ? accountId : 'User'}</Logo>

        <MenuContainer>
          <MenuItem>
            <Link to='/all'>All polls</Link>
          </MenuItem>
          <MenuItem>
            <Link to='/my'>My polls</Link>
          </MenuItem>
          <MenuItem>
            <Link to='/voted'>Voted polls</Link>
          </MenuItem>
        </MenuContainer>

        <Button
          text='Log out'
          click={() => {
            navigate('/')
            logout()
          }}
          style={{
            width: 100,
            backgroundColor: colors.violet,
            color: colors.white,
          }}
        />
      </HeaderContainer>
      <ContentContainer>
        <Content>
          <Routes location={state?.backgroundLocation || location}>
            <Route path='/all' element={<AllPolls />} />
            <Route path='/my' element={<MyPolls />} />
            <Route path='/voted' element={<VotedPolls />} />
            <Route path='/create' element={<CreatePoll />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Content>
      </ContentContainer>
      <FooterContainer>
        <DevelopersContainer>
          <Text>Developers</Text>
          <Text>Mileshko Olesia, Reut Ksenia</Text>
        </DevelopersContainer>
        <FooterImage src={footer} alt='footer image' />
      </FooterContainer>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={'/create'}
            element={<Modal handleClose={() => navigate('my')} />}
          />
        </Routes>
      )}
    </>
  )
}

const ContentContainer = styled.div`
  padding-top: 155px;
  margin: 0 10vw;
  min-height: 1150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const Background = styled.img`
  width: 100%;
  z-index: -1;
  position: absolute;
`
const HeaderContainer = styled.div`
  padding-top: 5vh;
  padding-left: 10vw;
  padding-right: 10vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`
const Logo = styled.span`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 41px;
  color: ${colors.white};
`
const MenuContainer = styled.div`
  display: flex;
  width: 550px;
  justify-content: space-between;
`
const MenuItem = styled.div`
  a {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 23px;
    color: ${colors.white};
  }
`
const Text = styled.p`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  color: ${colors.white};
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
const DevelopersContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0px;
  padding: 5vh 10vw;
`
const Content = styled.div`
  width: 55vw;
  background: linear-gradient(
      0deg,
      rgba(63, 61, 86, 0.2),
      rgba(63, 61, 86, 0.2)
    ),
    linear-gradient(
      199.54deg,
      rgba(219, 0, 255, 0) 0%,
      rgba(143, 0, 255, 0.44) 100%
    );
  backdrop-filter: blur(42px);
  border-radius: 16px;
`
