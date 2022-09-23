import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Option from '../components/Option'
import { useLocation } from 'react-router-dom'
import {
  get_poll,
  get_polls_for_owner,
  is_voted,
  vote,
} from '../assets/js/near/utils'
import { getPollsWithStatus } from '../functions/getPollsWithStatus'
import Button from '../components/Button'

const Poll = ({}) => {
  const location = useLocation()

  const [votedPoll, setVotedPoll] = useState(false)
  const [votedOption, setVotedOption] = useState(false)
  const [pollId, setPollId] = useState(location.state.id)
  const [poll, setPoll] = useState()

  useEffect(() => {
    get_poll(pollId)
      .then((poll) => {
        setPoll(getPollsWithStatus([poll])[0])
        poll.options.map((option) => {
          if (option.voted_users.includes(accountId)) setVotedOption(option.id)
        })
      })
      .catch((e) => console.log(e))
    is_voted(accountId, pollId)
      .then((res) => setVotedPoll(res))
      .catch((e) => console.log(e))
  }, [])

  const handleVote = (optionId) => {
    if (!votedPoll && poll.status === 'start') {
      vote(pollId, optionId)
        .then(() =>
          is_voted(accountId, pollId)
            .then((res) => setVotedPoll(res))
            .catch((e) => console.log(e))
        )
        .catch((e) => console.log(e))
      setVotedOption(optionId)
    }
  }

  const getPercent = (optionId) => {
    let sum = 0
    poll.options.forEach((option) => {
      sum += option.votes
    })
    let variant = poll.options.find((v) => v.id === optionId)
    return sum ? (variant.votes * 100) / sum : 0
  }

  return (
    <Container>
      <Header>{poll?.description}</Header>
      {poll?.options.map((option, index) => {
        return (
          <Option
            key={option.id}
            name={option.value}
            percent={getPercent(option.id)}
            votedPoll={votedPoll}
            votedOption={votedOption === option.id}
            click={() => {
              if (!votedPoll) handleVote(option.id)
            }}
            style={index % 2 !== 0 ? { backgroundColor: colors.white } : null}
            textStyle={index % 2 !== 0 ? { color: colors.violet } : null}
            status={poll.status}
          />
        )
      })}
      <Button
        text='Delete'
        style={{
          width: 110,
          height: 40,
          marginTop: 20,
          color: colors.active,
        }}
        click={() => {}}
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

export default Poll
