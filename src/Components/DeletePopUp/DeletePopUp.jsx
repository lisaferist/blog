import React from 'react'
import './DeletePopUp.scss'
import { useDispatch } from 'react-redux'

export default function DeletePopUp({ active, setActive }) {
  const dispatch = useDispatch()
  setActive(true)
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={active ? 'popup-wrapper active' : 'popup-wrapper'}
      onClick={() => {
        setActive(false)
      }}
    >
      <div className={active ? 'delete-popup active' : 'delete-popup'}>
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
              console.log(dispatch)
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
