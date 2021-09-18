import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthContext, LoadingContext } from '../../contexts';
import { getAuthToken } from '../../utils'
import { getMe } from '../../WebAPI'

import Header from '../Header'
import HomePage from '../../pages/HomePage'
import AboutPage from '../../pages/AboutPage'
import ListPage from '../../pages/ListPage'
import SinglePostPage from '../../pages/SinglePostPage'
import NewPostPage from '../../pages/NewPostPage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import LoadingPage from '../../pages/LoadingPage'

const Root = styled.div``

const App = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!getAuthToken()) return

    getMe().then(response => {
      if (response.ok !== 1) return
      setUser(response.data)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Root>
          <Router>
            <Header />
            {isLoading && <LoadingPage />}
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/list">
                <ListPage />
              </Route>
              <Route path="/post/:id">
                <SinglePostPage />
              </Route>
              <Route path="/newPost">
                <NewPostPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
            </Switch>
          </Router>
        </Root>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
