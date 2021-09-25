import React from "react"
import { Link } from "react-router-dom";
import styled from 'styled-components'

const AboutContainer = styled.div`
  position: relative;
  top: 110px;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 15px 300px;
  background: white;
  margin: 0 auto;
  word-break: break-all;
`

const AboutDesc = styled.div`
  margin-top: 80px;
  font-weight: bold;
  font-size: 24px;
`

const Circle = styled.div`
  bottom: 0;
  position: absolute;
  margin-top: 100px;
  width: 400px;
  height: 200px;
  border: 3px solid #393E46;
  border-bottom: none;
  border-radius: 200px 200px 0 0;
`

const Btn = styled(Link)`
  position: absolute;
  padding: 10px 20px;
  color: black;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  bottom: 50px;
  border-radius: 30px;
  transition: .25s;

  &:hover {
    background: #393E46;
    color: white;
  }
`

const AboutPage = () => {

  return (
    <AboutContainer>
      <AboutDesc>The best place to create a unique and beautiful blog for free.</AboutDesc>
      <Circle />
      <Btn to="/register">Join us</Btn>
    </AboutContainer>
  )
}

export default AboutPage
