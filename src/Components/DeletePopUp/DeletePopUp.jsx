import React from 'react'
import './DeletePopUp.scss'

export default function DeletePopUp() {
  return (
    <div className="delete-popup">
      <p className="delete-popup__text">Are you sure to delete this article?</p>
      <div className="delete-popup__buttons">
        <button className="delete-popup__button">No</button>
        <button className="delete-popup__button delete-popup__button--important">Yes</button>
      </div>
    </div>
  )
}
