import React from 'react'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useDispatch, useSelector } from 'react-redux'
import Markdown from 'markdown-to-jsx'
import { ScaleLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

import { editAvatar, editOverview, editTags } from '../ArticleInList/ArticleInList'
import { changeCurrentArticle, fetchArticleWithSlug } from '../../Store/articlesSlice'

import styleClasses from './Article.module.scss'

export default function Article({ slug }) {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.articles.articleStatus)
  const articleObj = useSelector((state) => state.articles.currentArticleObject)
  const currentUser = useSelector((state) => state.user.userObject)

  if (!articleObj || slug !== articleObj.slug) {
    dispatch(changeCurrentArticle({ article: null }))
    dispatch(fetchArticleWithSlug(slug))
  }
  function editText(text, length = 105) {
    if (text.length <= length) {
      return text
    }
    const newTextArray = []
    for (let i = 0; i < text.length / length; i++) {
      const substr = text.substring(length * i, length * (i + 1))
      if (!substr.includes(' ') && i + 1 < text.length / length) {
        newTextArray.push(`${substr}-<br>`)
      } else newTextArray.push(substr)
    }
    return newTextArray.join('')
  }

  function articleContent() {
    const tags = editTags(articleObj)
    const avatar = editAvatar(articleObj)

    const buttons =
      articleObj && articleObj.author && articleObj.author.username === currentUser.username ? (
        <div className="article__buttons">
          <button
            onClick={() => {
              console.log('delete')
            }}
            className={`${styleClasses.article__button} ${styleClasses['article__button--delete']}`}
          >
            Delete
          </button>
          <button className={styleClasses.article__button}>
            <Link to={`/articles/:${articleObj.slug}/edit`}>Edit</Link>
          </button>
        </div>
      ) : null
    return (
      <>
        <div className="article__header">
          <div style={{ height: 'max-content' }}>
            <h4 className="article__title">{editOverview(articleObj.title, 60)}</h4>
            <button className="article__like">
              <span className="article__like-icon"> </span>
              {articleObj.favoritesCount}
            </button>
            <ul className="article__tag-list">{tags}</ul>
            <p className={styleClasses.article__description}>{articleObj.description}</p>
          </div>
          <div>
            <div className="article__author-user">
              <p className="article__user-name">{editOverview(articleObj.author.username)}</p>
              {avatar}
              <p className="article__post-date">
                {format(parseISO(articleObj.createdAt), 'LLLL d, yyyy', { locale: enGB })}
              </p>
            </div>
            {buttons}
          </div>
        </div>
        <div>
          <div className={styleClasses.article__text}>
            <Markdown>{editText(articleObj.body)}</Markdown>
          </div>
        </div>
      </>
    )
  }

  const content =
    !articleObj || status === 'pending' ? (
      <div className="spin">
        <ScaleLoader color="#1890ff" />
      </div>
    ) : (
      articleContent()
    )

  return <div className={`article ${styleClasses.article}`}>{content}</div>
}
