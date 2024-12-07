import React from 'react'

import './Article.scss'

export default function Article({ articleObj }) {
  let tags = null
  if (articleObj.tags) {
    tags = articleObj.tags.map((tag, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="article__tag" key={`${articleObj.slug}${index}`}>
        {tag}
      </li>
    ))
  }
  const avatar = articleObj.author.image ? (
    <img className="article__user-avatar" alt="avatar" src={articleObj.author.image} />
  ) : (
    <div className="article__user-avatar article__user-avatar--no-avatar" />
  )

  return (
    <li className="article-list__article article">
      <div className="article__header">
        <div>
          <h4 className="article__title">{articleObj.title}</h4>
          <button className="article__like">
            <span className="article__like-icon"> </span>
            {articleObj.favoritesCount}
          </button>
          <ul className="article__tag-list">{tags}</ul>
        </div>
        <div className="article__author-user">
          <p className="article__user-name">{articleObj.author.username}</p>
          {avatar}
          <p className="article__post-date">{articleObj.createdAt}</p>
        </div>
      </div>
      <p className="article__text">{articleObj.body}</p>
    </li>
  )
}
