import React from 'react'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useDispatch, useSelector } from 'react-redux'
import Markdown from 'markdown-to-jsx'
import { ScaleLoader } from 'react-spinners'

import { editAvatar, editOverview, editTags } from '../ArticleInList/ArticleInList'
import { changeCurrentArticle, fetchArticleWithSlug } from '../../Store/articlesSlice'

import styleClasses from './Article.module.scss'

export default function Article({ slug }) {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.articles.articleStatus)
  const articleObj = useSelector((state) => state.articles.currentArticleObject)
  if (!articleObj || slug !== articleObj.slug) {
    dispatch(changeCurrentArticle({ article: null }))
    dispatch(fetchArticleWithSlug(slug))
  }
  function editText(text, length = 105) {
    console.log(text)
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
    return (
      <>
        <div className="article__header">
          <div>
            <h4 className="article__title">{editOverview(articleObj.title, 60)}</h4>
            <button className="article__like">
              <span className="article__like-icon"> </span>
              {articleObj.favoritesCount}
            </button>
            <ul className="article__tag-list">{tags}</ul>
          </div>
          <div className="article__author-user">
            <p className="article__user-name">{editOverview(articleObj.author.username)}</p>
            {avatar}
            <p className="article__post-date">
              {format(parseISO(articleObj.createdAt), 'LLLL d, yyyy', { locale: enGB })}
            </p>
          </div>
        </div>
        <div>
          <p className={styleClasses.article__description}>{editOverview(articleObj.description, 105)}</p>
          <p className={styleClasses.article__text}>
            <Markdown>{editText(articleObj.body)}</Markdown>
          </p>
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
