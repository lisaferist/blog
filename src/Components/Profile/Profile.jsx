import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import ErrorBlock from '../HOCs/ErrorBlock'
import { editOverview } from '../ArticleInList/ArticleInList'

import styleClasses from './Profile.module.scss'

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: 'username',
      email: 'Email@mail.com',
    },
    mode: 'onBlur',
  })

  console.log(errors)

  const urlRegExp =
    // eslint-disable-next-line
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  const emailRegExp = /^\S+@\S+\.\S+$/

  return (
    <div className="blog-app">
      <header className={`header ${styleClasses['profile-header']}`}>
        <h1 className="header__title">
          <Link to="/">Realworld Blog</Link>
        </h1>
        <Link to="/new-article">
          <button className={`header__button header__button--green ${styleClasses['profile-header__button--width']}`}>
            Create article
          </button>
        </Link>
        <div className={styleClasses['profile-header__user-info']}>
          <p className={styleClasses['profile-header__username']}>{editOverview('Profile Username', 14, true)}</p>
          <img className={styleClasses['profile-header__user-avatar']} alt="avatar" />
        </div>
        <button className={`header__button ${styleClasses['profile-header__button--bordered']}`}>Log Out</button>
      </header>
      <ErrorBlock>
        <div className="form-wrapper">
          <h2 className="form__title">Edit profile</h2>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data)
            })}
            className="form"
          >
            <label className="form__input-label">
              Username
              <br />
              <input
                className={errors.username ? 'form__input form__input--border-red' : 'form__input'}
                placeholder="Username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Your username needs to be at least 3 characters.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum length is 20',
                  },
                })}
              />
              <div className="form__input-error">
                {errors.username && (
                  <p className="form__input-error-message">{errors.username.message || 'Unexpected error!'}</p>
                )}
              </div>
            </label>

            <label className="form__input-label">
              Email address
              <br />
              <input
                className={errors.email ? 'form__input form__input--border-red' : 'form__input'}
                placeholder="Email address"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: { value: emailRegExp, message: 'Incorrect email address' },
                })}
              />
              <div className="form__input-error">
                {errors.email && (
                  <p className="form__input-error-message">{errors.email.message || 'Unexpected error!'}</p>
                )}
              </div>
            </label>

            <label className="form__input-label">
              New Password
              <br />
              <input
                className={errors.password ? 'form__input form__input--border-red' : 'form__input'}
                placeholder="New Password"
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: 'Your password needs to be at least 6 characters.',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Maximum length is 40',
                  },
                })}
              />
              <div className="form__input-error">
                {errors.password && (
                  <p className="form__input-error-message">{errors.password.message || 'Unexpected error!'}</p>
                )}
              </div>
            </label>

            <label className="form__input-label">
              Avatar image
              <br />
              <input
                className={errors.avatarImage ? 'form__input form__input--border-red' : 'form__input'}
                placeholder="Avatar image"
                {...register('avatarImage', {
                  pattern: {
                    value: urlRegExp,
                    message: 'Incorrect url',
                  },
                })}
              />
              <div className="form__input-error">
                {errors.avatarImage && (
                  <p className="form__input-error-message">{errors.avatarImage.message || 'Unexpected error!'}</p>
                )}
              </div>
            </label>

            <input className="form__submit-button" type="submit" value="Create" />
          </form>
        </div>
      </ErrorBlock>
    </div>
  )
}
