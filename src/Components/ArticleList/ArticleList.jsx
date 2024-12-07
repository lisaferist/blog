import React, { useEffect } from 'react'
import './ArticleList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import Article from '../Article'
import { fetchArticleList } from '../../Store/articlesSlice'

export default function ArticleList() {
  const articleList = useSelector((state) => state.articles.articleList)
  const status = useSelector((state) => state.articles.status)
  const currentPage = useSelector((state) => state.articles.currentPage)
  const articlesOnCurrentPage = articleList[currentPage]
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticleList())
  }, [dispatch])
  const content =
    status !== 'fulfilled' ? (
      <Spin size="large" />
    ) : (
      articlesOnCurrentPage.map((articleObj) => <Article articleObj={articleObj} key={articleObj.slug} />)
    )
  return <ul className="article-list">{content}</ul>
}
