import React, { Fragment } from 'react'
import './ArticleList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { Pagination } from 'antd'

import ArticleInList from '../ArticleInList'
import { changeCurrentArticle, changeCurrentPage } from '../../Store/articlesSlice'
import ErrorBlock from '../HOCs/ErrorBlock'

export default function ArticleList() {
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const articleList = useSelector((state) => state.articles.articleList)
  const currentPage = useSelector((state) => state.articles.currentPage)
  const articlesOnCurrentPage = articleList[currentPage]
  const status = useSelector((state) => state.articles.listStatus)
  const dispatch = useDispatch()

  const content =
    !articlesOnCurrentPage || status === 'pending' ? (
      <div className="spin">
        <ScaleLoader color="#1890ff" />
      </div>
    ) : (
      articlesOnCurrentPage.map((articleObj) => (
        <li
          key={articleObj.slug}
          onClick={() => {
            dispatch(changeCurrentArticle({ article: articleObj }))
          }}
        >
          <Link to={`/articles/${articleObj.slug}`}>
            <ErrorBlock>
              <ArticleInList articleObj={articleObj} />
            </ErrorBlock>
          </Link>
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
