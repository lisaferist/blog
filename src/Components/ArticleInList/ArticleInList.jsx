import React from 'react'
import './ArticleInList.scss'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'

export function editOverview(text, maxOverviewLength = 13, isShouldSpace = false) {
  if (!isShouldSpace || text.slice(0, Math.round(maxOverviewLength / 2) + 2).includes(' ')) {
    if (text.length > maxOverviewLength + 2) {
      let newText = text.substring(0, maxOverviewLength)
      newText = `${newText.replace(/\s+\S*$/, '')}...`
      return newText
    }
    return text
  }
  if (isShouldSpace && text.length < Math.round(maxOverviewLength / 2) + 2) {
    return text
  }
  return `${text.slice(0, Math.floor(maxOverviewLength / 2) + 2)}...`
}

export const editTags = (articleObj) => {
  if (articleObj.tagList) {
    return articleObj.tagList.map((tag, index, array) => {
      let key = `${articleObj.slug}_${tag}`
      if (array.filter((el) => el === tag).length > 1) {
        key = `${articleObj.slug}_${index}${tag}`
      }
      return (
        <li className="article__tag" key={key}>
          {editOverview(tag, 20)}
        </li>
      )
    })
  }
  return null
}
export const editAvatar = (articleObj) =>
  articleObj.author.image ? (
    <img className="article__user-avatar" alt="avatar" src={articleObj.author.image} />
  ) : (
    <div className="article__user-avatar article__user-avatar--no-avatar" />
  )

export default function ArticleInList({ articleObj }) {
  const tags = editTags(articleObj)
  const avatar = editAvatar(articleObj)
  return (
    <div className="article-list__article article">
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
      <p className="article__text">{articleObj.description}</p>
    </div>
  )
}
