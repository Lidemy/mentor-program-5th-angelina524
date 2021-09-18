import React from "react"
import styled, { keyframes } from 'styled-components'

const LoadingContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #393E46;
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 30px;
    height: 30px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #393E46;
    border-color: #393E46 transparent #393E46 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`

const LoadingPage = () => {
  return (
    <LoadingContainer>
      Loading...
      <Spinner />
    </LoadingContainer>
  )
}

export default LoadingPage
