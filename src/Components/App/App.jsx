import './App.scss'
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import ArticleList from '../ArticleList'
import { fetchArticleList } from '../../Store/articlesSlice'
import ErrorBlock from '../HOCs/ErrorBlock'
import Article from '../Article'

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
            <h1 className="header__title">Realworld Blog</h1>
            <button className="header__button">Sign in</button>
            <button className="header__button">Sign up</button>
          </header>
          <ErrorBlock>
            <Route path="/articles/slug" component={Article} />
            <Route path="/articles" component={ArticleList} exact />
            <Route path="/" component={ArticleList} exact />
          </ErrorBlock>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
