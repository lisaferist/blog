import React, { Fragment } from 'react'
import './ArticleList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { Pagination } from 'antd'

import ArticleInList from '../ArticleInList'
import { changeCurrentArticle, changeCurrentPage } from '../../Store/articlesSlice'
import ErrorBlock from '../HOCs/ErrorBlock'
import { falseIsProfileEdited } from '../../Store/userSlice'

export default function ArticleList() {
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const articleList = useSelector((state) => state.articles.articleList)
  const currentPage = useSelector((state) => state.articles.currentPage)
  const isProfileEdited = useSelector((state) => state.user.isProfileEdited)
  const articlesOnCurrentPage = articleList[currentPage]
  const status = useSelector((state) => state.articles.listStatus)
  const dispatch = useDispatch()

  if (isProfileEdited) {
    dispatch(falseIsProfileEdited())
  }

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
