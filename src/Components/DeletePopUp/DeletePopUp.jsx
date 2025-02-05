import React from 'react'
import './DeletePopUp.scss'
import { useDispatch } from 'react-redux'

import { deleteArticleWithSlug } from '../../Store/articlesSlice'

export default function DeletePopUp({ active, setActive, slug }) {
  const dispatch = useDispatch()
  return (
    <div
      className={active ? 'popup-wrapper active' : 'popup-wrapper'}
      onClick={() => {
        setActive(false)
      }}
    >
      <div
        className={active ? 'delete-popup active' : 'delete-popup'}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <p className="delete-popup__text">Are you sure to delete this article?</p>
        <div className="delete-popup__buttons">
          <button
            className="delete-popup__button"
            onClick={() => {
              setActive(false)
            }}
          >
            No
          </button>
          <button
            className="delete-popup__button delete-popup__button--important"
            onClick={() => {
              dispatch(deleteArticleWithSlug(slug))
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
