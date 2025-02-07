import React, { useEffect, useState } from 'react'
import './ArticleInList.scss'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { dislikeArticle, likeArticle } from '../../Store/articlesSlice'

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
  const history = useHistory()
  const tags = editTags(articleObj)
  const avatar = editAvatar(articleObj)
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(articleObj ? articleObj.favorited : false)
  useEffect(() => {
    if (articleObj) {
      setIsLiked(articleObj.favorited)
    }
  }, [articleObj])

  const likeOnClick = (event) => {
    event.stopPropagation()
    if (localStorage.getItem('token')) {
      if (!isLiked) {
        dispatch(likeArticle(articleObj.slug))
        setIsLiked(true)
      } else {
        dispatch(dislikeArticle(articleObj.slug))
        setIsLiked(false)
      }
    }
  }
  let { favoritesCount } = articleObj
  if (isLiked && !articleObj.favorited) {
    favoritesCount++
  }
  if (!isLiked && articleObj.favorited) {
    favoritesCount--
  }

  return (
    <div className="article-list__article article">
      <div className="article__header">
        <div>
          <h4 className="article__title">
            <button
              onClick={() => {
                history.push(`/articles/${articleObj.slug}`)
              }}
            >
              {editOverview(articleObj.title, 60)}
            </button>
          </h4>
          <button className="article__like" onClick={likeOnClick}>
            <span className={isLiked ? 'article__like-icon article__like-icon--red' : 'article__like-icon'}> </span>
            {favoritesCount}
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
