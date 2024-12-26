import React from 'react'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useSelector } from 'react-redux'
import Markdown from 'markdown-to-jsx'

import { editAvatar, editOverview, editTags } from '../ArticleInList/ArticleInList'

import styleClasses from './Article.module.scss'

export default function Article({ slug }) {
  const articleObj = useSelector((state) => state.articles.currentArticleObject)

  if (!articleObj) {
    return <p>No article here ;(</p>
  }

  const tags = editTags(articleObj)
  const avatar = editAvatar(articleObj)

  return (
    <div className={`article ${styleClasses.article}`}>
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
          <Markdown>{articleObj.body}</Markdown>
        </p>
      </div>
    </div>
  )
}
