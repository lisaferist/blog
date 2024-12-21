import React, { Fragment, useEffect } from 'react'
import './ArticleList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin } from 'antd'

import ArticleInList from '../ArticleInList'
import { changeCurrentPage, fetchArticleList } from '../../Store/articlesSlice'
import ErrorBlock from '../HOCs/ErrorBlock'

export default function ArticleList() {
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const articleList = useSelector((state) => state.articles.articleList)
  const currentPage = useSelector((state) => state.articles.currentPage)
  const articlesOnCurrentPage = articleList[currentPage]
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticleList())
  }, [dispatch])
  const content = !articlesOnCurrentPage ? (
    <Spin size="large" />
  ) : (
    articlesOnCurrentPage.map((articleObj) => (
      <li key={articleObj.slug}>
        <ErrorBlock>
          <ArticleInList articleObj={articleObj} />
        </ErrorBlock>
      </li>
    ))
  )
  return (
    <>
      <ul className="article-list">{content}</ul>
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        defaultPageSize="1"
        hideOnSinglePage="true"
        total={Math.ceil(articlesCount / 20)}
        onChange={(e) => {
          dispatch(changeCurrentPage({ page: e }))
        }}
        align="center"
      />
    </>
  )
}
