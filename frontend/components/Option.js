import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import votedIcon from '../assets/img/voted.svg'

const Option = ({
  name,
  percent,
  style,
  textStyle,
  click,
  votedPoll,
  votedOption,
  status,
}) => {
  const [stylePercent, setStylePercent] = useState(style)
  const [styleContainer, setStyleContainer] = useState()
  const [votedValue, setVotedValue] = useState(votedOption)

  const vote = () => {
    click()
    setStylePercent({ ...style, width: `${percent}%` })
    setStyleContainer({
      background: 'none',
      border: `1px solid ${colors.white}`,
    })
    if (!votedPoll && status === 'start') {
      setVotedValue(true)
    }
  }

  useEffect(() => {
    setStylePercent(
      votedPoll || status !== 'start'
        ? { ...style, width: `${percent}%` }
        : null
    )
    setStyleContainer(
      votedPoll || status !== 'start'
        ? { background: 'none', border: `1px solid ${colors.white}` }
        : null
    )
  }, [votedPoll])

  console.log(votedPoll)

  return (
    <>
      <Container style={styleContainer} onClick={vote}>
        <NameOption
          style={
            (votedPoll || status !== 'start') && percent ? textStyle : null
          }
        >
          <div>{name}</div>
          <div>{!percent && '0%'}</div>
        </NameOption>
        <Percent style={stylePercent}>
          <PercentText
            percent={percent}
            style={votedPoll || status !== 'start' ? textStyle : null}
          >
            {percent ? `${percent}%` : ''}
          </PercentText>
        </Percent>
        {votedValue && <VotedIcon src={votedIcon} />}
      </Container>
    </>
  )
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${colors.white};
  border-radius: 100px;
  height: 45px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.38) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  border: none;
  :hover {
    background: none;
    border: 1px solid ${colors.white};
  }
`
const Percent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 0%;
  background-color: ${colors.violet};
  border-radius: 100px;
  height: 43px;
  transition: width 1s ease-in-out 0.3s;
`
const NameOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  font-family: 'Nunito';
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  color: ${colors.white};
  padding: 0 20px;
  width: 92%;
`
const PercentText = styled.div`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  color: ${colors.white};
  padding: ${(props) => (props.percent === 100 ? '0px 50px' : '0px 20px')};
`
const VotedIcon = styled.img`
  position: absolute;
  right: 40px;
  height: 25px;
  width: 25px;
`
export default Option
