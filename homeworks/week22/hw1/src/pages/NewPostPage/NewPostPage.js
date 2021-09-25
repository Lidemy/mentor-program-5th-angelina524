import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { addPost } from '../../WebAPI'
import { getAuthToken } from '../../utils'

const SinglePostPageContainer = styled.div`
  position: relative;
  top: 60px;
  width: 100%;
  max-width: 700px;
  margin: 50px auto;
  background: white;
  padding: 60px 30px;
  box-sizing: border-box;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FormTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`

const FormInput = styled.input`
  padding: 8px 20px;
  margin: 10px 0;
  font-size: 18px;
  border: 1px solid #393E46;
  box-sizing: border-box;
  width: 100%;

  &::placeholder {
    color: #393E46;
  }
`
const FormTextArea = styled.textarea`
  padding: 8px 20px;
  margin: 10px 0;
  font-size: 18px;
  border: 1px solid #393E46;
  box-sizing: border-box;
  width: 100%;
`

const FormBtn = styled.button`
  width: 150px;
  background: #393E46;
  margin-top: 20px;
  padding: 10px 0;
  border-radius: 30px;
  color: #EEEEEE;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border: none;
  width: 100%;
`

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`

const NewPostPage = () => {
  const history = useHistory()
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [errorMessage, setErrorMessage] = useState()

  const handleFormSubmit = e => {
    e.preventDefault()
    const token = getAuthToken()
    if (!token) return

    if (!postTitle || !postBody) {
      return setErrorMessage('title and content are required')
    }

    addPost(token, postTitle, postBody)
    history.push('/list')
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <SinglePostPageContainer>
        <FormTitle>New Post</FormTitle>
        <div><FormInput value={postTitle} onChange={e => setPostTitle(e.target.value)} type="text" name="title" placeholder="title" /></div>
        <div><FormTextArea value={postBody} onChange={e => setPostBody(e.target.value)} cols="50" rows="12" name="body" /></div>
        <FormBtn>submit</FormBtn>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SinglePostPageContainer>
    </form>
  )
}

export default NewPostPage
