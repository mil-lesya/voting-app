import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Option from '../components/Option'

const Poll = ({}) => {
  const [votedPull, setVotedPull] = useState(false)
  const [votedOption, setVotedOption] = useState(false)

  const options = [
    {
      id: '1',
      name: 'JavaScript',
      percent: 88,
    },
    {
      id: '2',
      name: 'C++',
      percent: 69,
    },
    {
      id: '3',
      name: 'C#',
      percent: 71,
    },
  ]
  return (
    <Container>
      <Header>Name poll</Header>
      {options.map((option, index) => {
        return (
          <Option
            key={option.id}
            name={option.name}
            percent={option.percent}
            votedPull={votedPull}
            click={() => {
              setVotedPull(true)
              setVotedOption(option.id)
            }}
            style={index % 2 !== 0 ? { backgroundColor: colors.white } : null}
            textStyle={index % 2 !== 0 ? { color: colors.violet } : null}
          />
        )
      })}
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

export default Poll
