import React, { useEffect } from 'react'
import './ArticleList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import ArticleInList from '../ArticleInList'
import { fetchArticleList } from '../../Store/articlesSlice'
import ErrorBlock from '../HOCs/ErrorBlock'

export default function ArticleList() {
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
      <ErrorBlock>
        <ArticleInList articleObj={articleObj} key={articleObj.slug} />
      </ErrorBlock>
    ))
  )
  return <ul className="article-list">{content}</ul>
}
