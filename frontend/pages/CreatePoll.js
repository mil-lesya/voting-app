import React, {useState} from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'
import Input from '../components/Input'
import DateTimePicker from 'react-datetime-picker'
import calendarTime from '../assets/img/calendar-time.svg'
import Button from '../components/Button'
import {create_poll} from '../assets/js/near/utils'
import {useNavigate} from 'react-router-dom'

const CreatePoll = ({}) => {
  const [description, setDescription] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [options, setOptions] = useState({option1: '', option2: ''})
  const [count, setCount] = useState([{id: '1'}, {id: '2'}])

  const navigate = useNavigate()

  const handleSubmit = async () => {
    create_poll(description.toString(), start.toString(), end.toString(), Object.values(options))
      .then(() => navigate('/my'))
      .catch((e) => console.log(e))
  }

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
            <DateTimePickerStyled
              calendarIcon={<CalendarIcon src={calendarTime}/>}
              clearIcon={null}
              format={'y-MM-dd h:mm:ss a'}
              locale="en"
              onChange={(date) => setStart(date)}
              value={start}
              maxDate={new Date(end) || null}
            />
          </div>
          <div>
            <Title>End time</Title>
            <DateTimePickerStyled
              calendarIcon={<CalendarIcon src={calendarTime}/>}
              clearIcon={null}
              format={'y-MM-dd h:mm:ss a'}
              locale="en"
              onChange={(date) => setEnd(date)}
              value={end}
              minDate={new Date(start) || null}
            />
          </div>
        </DateContainer>

        <OptionsTitleContainer>
          <Title>Options</Title>
          <Button
            text="Add option"
            style={{
              width: 120,
              height: 35,
              marginBottom: 15,
              marginLeft: 20,
            }}
            click={() => {
              setCount((prev) => {
                if (prev.length <= 9)
                  return [...prev, {id: `${prev.length + 1}`}]
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
                    [`option${item.id}`]: e.target.value.toString(),
                  }))
                }
              />
            )
          })}
          <Button
            text="Create"
            style={{
              width: 110,
              height: 40,
              marginTop: 20,
            }}
            click={() => handleSubmit()}
          />
        </InputsContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
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
  font-weight: 600;
  font-size: 19px;
  line-height: 28px;
  color: ${colors.white};
  margin-bottom: 8px;
`
const DateTimePickerStyled = styled(DateTimePicker)`
  width: 430px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid ${colors.white};
  display: flex;
  align-items: center;
  color: ${colors.white};
  .react-datetime-picker__wrapper {
    border: none;
    margin: 10px;
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 26px;
    color: ${colors.white};
  }
  .react-datetime-picker__inputGroup__input {
    color: ${colors.white};
    ::placeholder {
      color: ${colors.placeholder};
    }
  }
`
const CalendarIcon = styled.img`
  height: 25px;
  width: 25px;
`
const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  margin: 30px 0px;
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
