import './App.scss'
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import ArticleList from '../ArticleList'
import ErrorBlock from '../HOCs/ErrorBlock'
import Article from '../Article'
import SignUpForm from '../SignUpForm'
import SignInForm from '../SignInForm'
import Profile from '../Profile'
import { editOverview } from '../ArticleInList/ArticleInList'
import { getUserByToken, logOut } from '../../Store/userSlice'
import ArticleForm from '../ArticleForm'

function App() {
  const dispatch = useDispatch()
  const isRegistered = useSelector((state) => state.user.isRegistered)
  const userObj = useSelector((state) => state.user.userObject)

  useEffect(() => {
    if (localStorage.getItem('token') && !userObj) {
      dispatch(getUserByToken())
    }
  }, [userObj])

  const appHeader =
    isRegistered || localStorage.getItem('token') ? (
      <header className="header registered-header">
        <h1 className="header__title">
          <Link to="/">Realworld Blog</Link>
        </h1>
        <Link to="/new-article">
          <div className="header__button header__button--green registered-header__button--width">
            <p>Create article</p>
          </div>
        </Link>
        <Link to="/profile">
          <div className="registered-header__user-info">
            <p className="registered-header__username">
              {userObj && userObj.username ? editOverview(userObj.username, 14, true) : null}
            </p>
            <img className="registered-header__user-avatar" alt="avatar" src={(userObj && userObj.image) || null} />
          </div>
        </Link>
        <div
          className="header__button registered-header__button--bordered"
          onClick={() => {
            dispatch(logOut())
          }}
        >
          <Link to="/">Log Out</Link>
        </div>
      </header>
    ) : (
      <header className="header unregistered-header">
        <h1 className="header__title">
          <Link to="/">Realworld Blog</Link>
        </h1>
        <Link to="/sign-in">
          <div className="header__button unregistered-header__button">
            <p>Sign in</p>
          </div>
        </Link>
        <Link to="/sign-up">
          <div className="header__button unregistered-header__button header__button--green">
            <p>Sign up</p>
          </div>
        </Link>
      </header>
    )

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: '#1890ff',
              itemActiveColorDisabled: '#FFFFFF',
              itemBg: '#ebeef3',
            },
          },
          token: {
            colorPrimary: '#FFFFFF',
            colorPrimaryHover: '#ebeef3',
          },
        }}
      >
        <div className="blog-app">
          {appHeader}
          <ErrorBlock>
            {/* <Route path="/articles/:slug" render={({ match }) => <Article slug={match.params.slug} />} exact /> */}
            <Route path="/articles/:slug" component={Article} exact />
            <Route path="/articles" component={ArticleList} exact />
            <Route path="/" component={ArticleList} exact />
            <Route path="/sign-up" component={SignUpForm} exact />
            <Route path="/sign-in" component={SignInForm} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/new-article" component={ArticleForm} exact />
            <Route path="/articles/:slug/edit" component={ArticleForm} exact />
          </ErrorBlock>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
