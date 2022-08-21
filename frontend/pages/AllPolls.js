import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Button from '../components/Button'
import Poll from '../components/Poll'
import { useNavigate } from 'react-router-dom'
import { get_all_polls } from '../assets/js/near/utils'
import { getPollsWithStatus } from '../functions/getPollsWithStatus'

const AllPolls = ({}) => {
  const navigate = useNavigate()

  const [polls, setPolls] = useState([])

  useEffect(() => {
    get_all_polls( 0, 10)
      .then((polls) => setPolls(getPollsWithStatus(polls)))
      .catch((e) => console.log(e))
  }, []);

  return (
    <Container>
      <Header>All polls</Header>
      {polls.map((item, index) => {
        return <Poll key={index} name={item.description} status={item.status} />
      })}
      <Button
        text='Create poll'
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
  font-size: 25px;
  line-height: 35px;
  color: ${colors.white};
  margin-bottom: 15px;
`

export default AllPolls
