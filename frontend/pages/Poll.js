import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Option from '../components/Option'
import { useLocation, useNavigate } from 'react-router-dom'
import { delete_poll, get_poll, is_voted, vote } from '../assets/js/near/utils'
import { getPollsWithStatus } from '../functions/getPollsWithStatus'
import Button from '../components/Button'
import Modal from '../components/Modal'
import trash from '../assets/img/trash.svg'
import { Oval } from 'react-loader-spinner'

const Poll = ({}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [votedPoll, setVotedPoll] = useState(false)
  const [votedOption, setVotedOption] = useState(false)
  const [pollId, setPollId] = useState(location.state.id)
  const [poll, setPoll] = useState()
  const [visibleModal, setVisibleModal] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

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

  const handleDeletePoll = (pollId) => {
    setIsFetching(true)
    if (poll.owner === accountId) {
      delete_poll(pollId)
        .then(() => {
          setIsFetching(false)
          setVisibleModal(true)
        })
        .catch((e) => console.log(e))
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
      {poll?.owner === accountId && (
        <Button
          text={
            isFetching ? (
              <Oval
                height={20}
                width={20}
                color={colors.active}
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='#F85656'
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              'Delete'
            )
          }
          style={{
            width: 110,
            height: 40,
            marginTop: 20,
            color: colors.active,
          }}
          click={() => handleDeletePoll(pollId)}
        />
      )}

      <Modal
        visible={visibleModal}
        setVisible={setVisibleModal}
        backgroundStyle={{}}
        containerStyle={{
          height: 300,
          width: 400,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <TitleContainer>
          <TrashIcon src={trash} />
          <TitleModal>The poll was deleted</TitleModal>
        </TitleContainer>
        <Button
          click={() => {
            navigate('/my')
            setVisibleModal(false)
          }}
          text='OK'
          style={{
            fontSize: 20,
            backgroundColor: colors.violet,
            color: colors.white,
            height: 40,
          }}
        />
      </Modal>
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
  font-family: 'Nunito', serif;
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 35px;
  color: ${colors.white};
  margin-bottom: 15px;
`
const TrashIcon = styled.img`
  height: 80px;
  width: 80px;
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const TitleModal = styled.p`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 23px;
  line-height: 30px;
  color: ${colors.violet};
  text-align: center;
  margin-top: 15px;
`

export default Poll
