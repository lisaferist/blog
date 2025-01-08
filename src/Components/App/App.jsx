import './App.scss'
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import ArticleList from '../ArticleList'
import { fetchArticleList } from '../../Store/articlesSlice'
import ErrorBlock from '../HOCs/ErrorBlock'
import Article from '../Article'
import SignUpForm from '../SignUpForm'
import SignInForm from '../SignInForm'

function App() {
  const articleList = useSelector((state) => state.articles.articleList)
  const currentPage = useSelector((state) => state.articles.currentPage)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!articleList[currentPage]) {
      dispatch(fetchArticleList())
    }
  }, [currentPage])

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
          <header className="header">
            <h1 className="header__title">
              <Link to="/">Realworld Blog</Link>
            </h1>
            <Link to="/sign-in">
              <button className="header__button">Sign in</button>
            </Link>
            <Link to="/sign-up">
              <button className="header__button header__button--green">Sign up</button>
            </Link>
          </header>
          <ErrorBlock>
            <Route path="/articles/:slug" render={({ match }) => <Article slug={match.params.slug} />} exact />
            <Route path="/articles" component={ArticleList} exact />
            <Route path="/" component={ArticleList} exact />
            <Route path="/sign-up" component={SignUpForm} exact />
            <Route path="/sign-in" component={SignInForm} exact />
          </ErrorBlock>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
