import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Button from '../components/Button'
import Poll from '../components/Poll'

const VotedPolls = ({}) => {
  const navigate = useNavigate()

  const polls = [
    { id: '1', name: 'Best programming language', status: 'start' },
    { id: '2', name: 'Best programming language', status: 'end' },
    { id: '3', name: 'Best programming language', status: 'start' },
    { id: '4', name: 'Best programming language', status: 'wait' },
    { id: '5', name: 'Best programming language', status: 'wait' },
    { id: '6', name: 'Best programming language', status: 'start' },
    { id: '7', name: 'Best programming language', status: 'end' },
    { id: '8', name: 'Best programming language', status: 'wait' },
  ]
  return (
    <Container>
      <Header>Voted polls</Header>
      {polls.map((item) => {
        return <Poll key={item.id} name={item.name} status={item.status} />
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
  font-size: 23px;
  line-height: 30px;
  color: ${colors.white};
  margin-bottom: 15px;
`
export default VotedPolls
