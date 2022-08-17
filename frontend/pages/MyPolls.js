import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Poll from '../components/Poll'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { get_polls_for_owner } from '../assets/js/near/utils'
import { getPollsWithStatus } from '../functions/getPollsWithStatus'

const MyPolls = ({}) => {
  const navigate = useNavigate()
  const [myPolls, setMyPolls] = useState([])

  useEffect(() => {
    get_polls_for_owner(accountId, 0, 10)
      .then((polls) => setMyPolls(getPollsWithStatus(polls)))
      .catch((e) => console.log(e))
  }, []);

  return (
    <Container>
      <Header>My polls</Header>
      {myPolls.map((item, index) => {
        return <Poll key={index} name={item.description} status={item.status}/>
      })}
      <Button
        text="Create poll"
        style={{
          width: 125,
          marginTop: 15,
        }}
        click={() => navigate('/create')}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`
const Header = styled.div`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 23px;
  line-height: 30px;
  color: ${colors.white};
  margin-bottom: 15px;
`
export default MyPolls
