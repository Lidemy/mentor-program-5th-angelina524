import React, { useState, useContext } from "react"
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { login, getMe } from '../../WebAPI'
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils'

const FormContainer = styled.div`
  position: relative;
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  background: white;
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
`

const FormTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`

const FormInput = styled.input`
  padding: 8px 20px;
  margin: 10px 0;
  font-size: 18px;
  border: 1px solid #393E46;
  box-sizing: border-box;

  &::placeholder {
    color: #393E46;
  }
`

const FormBtn = styled.button`
  width: 150px;
  background: #393E46;
  margin-top: 20px;
  padding: 10px 0;
  border-radius: 30px;
  color: #EEEEEE;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border: none;
`

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`

const LoginPage = () => {
  const history = useHistory()
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()

  const handleFormSubmit = e => {
    e.preventDefault()

    login(username, password).then(data => {
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }
      setAuthToken(data.token)

      getMe().then(response => {
        if (response.ok !== 1) {
          setAuthToken(null)
          return setErrorMessage(response.toString())
        }

        setUser(response.data)
        history.push('/')
      })
    })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <div><FormInput value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="username" /></div>
        <div><FormInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" /></div>
        <FormBtn>submit</FormBtn>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
    </form>
  )
}

export default LoginPage
