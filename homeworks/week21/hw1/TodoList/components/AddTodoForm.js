import styled from 'styled-components'
import { useState, useRef } from 'react'

const FormWrapper = styled.div`
  padding: 30px 20px;
  display: flex;
  justify-content: center;
`

const Input = styled.input`
  padding: 10px 15px;
  width: 100%;
  margin-right: 20px;
  border: 2px solid #BD4B4B;
  font-size: 18px;

  &::placeholder {
    color: #BD4B4B;
  }
`

const Button = styled.button`
  padding: 10px 25px;
  background: #BD4B4B;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`

const AddTodoForm = ({ add }) => {

  const [value, setValue] = useState('')

  const id = useRef(1)

  const handleInputChange = e => {
    setValue(e.target.value)
  }

  const handleAddClick = () => {
    if (!value) return
    add((prevDate) => {
      return [
        {
          id: id.current,
          value,
          checked: false
        },
        ...prevDate,
      ]
    })
    id.current++
    setValue('')
  }

  return (
    <FormWrapper>
      <Input value={value} onChange={handleInputChange} type='text' placeholder="Let's do something." />
      <Button onClick={handleAddClick}>＋</Button>
    </FormWrapper>
  )
}

export default AddTodoForm