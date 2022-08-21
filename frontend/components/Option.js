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
  votedPull,
  votedOption,
}) => {
  const [stylePercent, setStylePercent] = useState(style)
  const [styleContainer, setStyleContainer] = useState()
  const [votedValue, setVotedValue] = useState(votedOption)

  const vote = () => {
    click()
    setVotedValue(true)
    setStylePercent({ ...style, width: `${percent}%` })
    setStyleContainer({
      background: 'none',
      border: `1px solid ${colors.white}`,
    })
  }

  useEffect(() => {
    setStylePercent(votedPull ? { ...style, width: `${percent}%` } : null)
    setStyleContainer(
      votedPull
        ? { background: 'none', border: `1px solid ${colors.white}` }
        : null
    )
  }, [votedPull])

  return (
    <>
      <Container style={styleContainer} onClick={vote}>
        <Percent style={stylePercent}>
          <NameOption style={votedPull ? textStyle : null}>{name}</NameOption>
          {votedPull && <PercentText style={textStyle}>{percent}%</PercentText>}
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
  justify-content: space-between;
  width: 0%;
  background-color: ${colors.violet};
  border-radius: 100px;
  height: 43px;
  transition: width 1s ease-in-out 0.3s;
`
const NameOption = styled.div`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  color: ${colors.white};
  padding: 0px 20px;
`
const PercentText = styled.div`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  color: ${colors.white};
  padding: 0px 20px;
`
const VotedIcon = styled.img`
  height: 25px;
  width: 25px;
  margin-right: 20px;
`
export default Option
