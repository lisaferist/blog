import './App.scss'
import React from 'react'
import { ConfigProvider, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import ArticleList from '../ArticleList'
import { changeCurrentPage, fetchArticleList } from '../../Store/articlesSlice'

function App() {
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const articleList = useSelector((state) => state.articles.articleList)
  const currentPage = useSelector((state) => state.articles.currentPage)
  const dispatch = useDispatch()

  return (
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
        <ArticleList />
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          defaultPageSize="1"
          hideOnSinglePage="true"
          total={Math.ceil(articlesCount / 20)}
          onChange={(e) => {
            if (!articleList[e]) {
              dispatch(fetchArticleList())
            }
            dispatch(changeCurrentPage({ page: e }))
          }}
          align="center"
        />
      </div>
    </ConfigProvider>
  )
}

export default App
