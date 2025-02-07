import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useDispatch, useSelector } from 'react-redux'
import Markdown from 'markdown-to-jsx'
import { ScaleLoader } from 'react-spinners'
import { Link, useParams } from 'react-router-dom'

import { editAvatar, editOverview, editTags } from '../ArticleInList/ArticleInList'
import { changeCurrentArticle, dislikeArticle, fetchArticleWithSlug, likeArticle } from '../../Store/articlesSlice'
import DeletePopUp from '../DeletePopUp'

import styleClasses from './Article.module.scss'

export default function Article() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const status = useSelector((state) => state.articles.articleStatus)
  const articleObj = useSelector((state) => state.articles.currentArticleObject)
  const currentUser = useSelector((state) => state.user.userObject)

  const [popupActive, setPopupActive] = useState(false)
  const [isLiked, setIsLiked] = useState(articleObj ? articleObj.favorited : false)

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

  useEffect(() => {
    if (articleObj) {
      setIsLiked(articleObj.favorited)
    }
  }, [articleObj])

  function articleContent() {
    const tags = editTags(articleObj)
    const avatar = editAvatar(articleObj)
    const likeOnClick = () => {
      if (localStorage.getItem('token')) {
        if (!isLiked) {
          dispatch(likeArticle(slug))
          setIsLiked(true)
        } else {
          dispatch(dislikeArticle(slug))
          setIsLiked(false)
        }
      }
    }

    const buttons =
      articleObj && currentUser && articleObj.author.username === currentUser.username ? (
        <div className="article__buttons">
          <button
            onClick={() => {
              setPopupActive(true)
            }}
            className={`${styleClasses.article__button} ${styleClasses['article__button--delete']}`}
          >
            Delete
          </button>
          <button className={styleClasses.article__button}>
            <Link to={`/articles/${articleObj.slug}/edit`}>Edit</Link>
          </button>
        </div>
      ) : null
    let { favoritesCount } = articleObj
    if (isLiked && !articleObj.favorited) {
      favoritesCount++
    }
    if (!isLiked && articleObj.favorited) {
      favoritesCount--
    }
    return (
      <>
        <div className="article__header">
          <div style={{ height: 'max-content' }}>
            <h4 className="article__title">{editOverview(articleObj.title, 60)}</h4>
            <button className="article__like" onClick={likeOnClick}>
              <span className={isLiked ? 'article__like-icon article__like-icon--red' : 'article__like-icon'}> </span>
              {favoritesCount}
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
            <Markdown>{articleObj.body ? editText(articleObj.body) : ''}</Markdown>
          </div>
        </div>
        <DeletePopUp active={popupActive} setActive={setPopupActive} slug={articleObj.slug} />
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
