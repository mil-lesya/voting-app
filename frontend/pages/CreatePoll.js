import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Input from '../components/Input'
import DatePicker from 'react-date-picker'
import calendarTime from '../assets/img/calendar-time.svg'
import Button from '../components/Button'

const CreatePoll = ({}) => {
  const [description, setDescription] = useState('')
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [options, setOptions] = useState({ option1: '', option2: '' })
  const [count, setCount] = useState([{ id: '1' }, { id: '2' }])

  return (
    <Container>
      <Header>New poll</Header>
      <ContentContainer>
        <Title>Description</Title>
        <Input
          placeholder={'Enter a description'}
          value={description}
          setValue={(e) => setDescription(e.target.value)}
        />

        <DateContainer>
          <div>
            <Title>Start time</Title>
            <DatePickerStyled
              calendarIcon={<CalendarIcon src={calendarTime} />}
              clearIcon={null}
              format={'dd.MM.y'}
              locale='en'
              onChange={(date) => setStart(date)}
              value={start}
            />
          </div>
          <div>
            <Title>End time</Title>
            <DatePickerStyled
              calendarIcon={<CalendarIcon src={calendarTime} />}
              clearIcon={null}
              format={'dd.MM.y'}
              locale='en'
              onChange={(date) => setEnd(date)}
              value={end}
            />
          </div>
        </DateContainer>

        <OptionsTitleContainer>
          <Title>Options</Title>
          <Button
            text='Add option'
            style={{
              width: 150,
              height: 43,
              marginBottom: 15,
              marginLeft: 30,
            }}
            click={() => {
              setCount((prev) => {
                if (prev.length <= 9)
                  return [...prev, { id: `${prev.length + 1}` }]
                return [...prev]
              })
            }}
          />
        </OptionsTitleContainer>
        <InputsContainer>
          {count.map((item) => {
            return (
              <Input
                key={item.id}
                placeholder={`Option ${item.id}`}
                value={options[`option${item.id}`]}
                setValue={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    [`option${item.id}`]: e.target.value,
                  }))
                }
              />
            )
          })}
          <Button
            text='Create'
            style={{
              width: 150,
              height: 43,
              marginBottom: 15,
              marginTop: 30,
            }}
            click={() => {}}
          />
        </InputsContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`
const Header = styled.div`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 50px;
  color: ${colors.white};
  margin-bottom: 15px;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`
const Title = styled.div`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  color: ${colors.white};
  margin-bottom: 15px;
`
const DatePickerStyled = styled(DatePicker)`
  width: 445px;
  height: 55px;
  border-radius: 100px;
  border: 1px solid ${colors.white};
  display: flex;
  align-items: center;
  color: ${colors.white};
  .react-date-picker__wrapper {
    border: none;
    margin: 10px;
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
    line-height: 29px;
    color: ${colors.white};
  }
  .react-date-picker__inputGroup__input {
    color: ${colors.white};
    ::placeholder {
      color: ${colors.placeholder};
    }
  }
`
const CalendarIcon = styled.img`
  height: 30px;
  width: 30px;
`
const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  margin: 50px 0px;
`
const OptionsTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
`
export default CreatePoll
