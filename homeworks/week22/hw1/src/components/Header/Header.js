import React, { useState, useContext } from "react"
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils'

const HeaderContainer = styled.div`
  position: fixed;
  padding: 0px 40px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

const HeaderTitle = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #393E46;
  text-decoration: none;
`

const Hamburger = styled.div`
  display: block;
  position: relative;
  cursor: pointer;

  ${props => props.$isMenuOpen && `
    z-index: 2;
`}
`

const HamburgerIcon = styled.span`
  display: block;
  width: 30px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  background: #393E46;
  border-radius: 3px;

  ${props => props.$isMenuOpen && `
    background: #EEEEEE;
  `}
`

const NavContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: -200px;
  width: 200px;
  height: 100%;
  background: #393E46;
  transition: .25s;
  z-index: 1;

  ${props => props.$isMenuOpen && `
    left: 0;
  `}
`

const Nav = styled(Link)`
  width: 100px;
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  border-left: 2px solid transparent;
  transition: .25s;
  color: #EEEEEE;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    border-left: 2px solid #EEEEEE;
  }
`

const Header = () => {
  const { user, setUser } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
  }

  return (
    <HeaderContainer>
      <Hamburger $isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <HamburgerIcon $isMenuOpen={isMenuOpen}></HamburgerIcon>
        <HamburgerIcon $isMenuOpen={isMenuOpen}></HamburgerIcon>
        <HamburgerIcon $isMenuOpen={isMenuOpen}></HamburgerIcon>
      </Hamburger>
      <NavContainer $isMenuOpen={isMenuOpen}>
        <Nav to="/">HOME</Nav>
        <Nav to="/about">ABOUT</Nav>
        <Nav to="/list">LIST</Nav>
        {user && <Nav to="/newPost">NEW POST</Nav>}
        {!user && <Nav to="/register">REGISTER</Nav>}
        {!user && <Nav to="/login">LOG IN</Nav>}
        {user && <Nav to="/" onClick={handleLogout}>LOG OUT</Nav>}
      </NavContainer>
      <HeaderTitle to="/">Blog - Now!</HeaderTitle>
    </HeaderContainer>
  )
}

export default Header
