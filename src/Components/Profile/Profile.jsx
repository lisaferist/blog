import './Profile.scss'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { updateUserInfo } from '../../Store/userSlice'

export default function Profile() {
  const userObj = useSelector((state) => state.user.userObject)
  const error = useSelector((state) => state.user.error)
  const errorObject = useSelector((state) => state.user.errorObject)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: userObj && userObj.username,
      email: userObj && userObj.email,
      image: userObj && userObj.image,
    },
    mode: 'onBlur',
  })

  if (!localStorage.getItem('token')) {
    return <Redirect to="/sign-in" />
  }

  const urlRegExp =
    // eslint-disable-next-line
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  const emailRegExp = /^\S+@\S+\.\S+$/

  return (
    <div className="profile">
      <div className="form-wrapper">
        <h2 className="form__title">Edit profile</h2>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.password === '') {
              dispatch(updateUserInfo({ image: data.image, email: data.email, username: data.username }))
            } else dispatch(updateUserInfo(data))
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
              {(errors.username || (errorObject && errorObject.username)) && (
                <p className="form__input-error-message">
                  {(errors.username && errors.username.message) ||
                    (errorObject && errorObject.username) ||
                    'Unexpected error!'}
                </p>
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
              {(errors.email || (errorObject && errorObject.email)) && (
                <p className="form__input-error-message">
                  {(errors.email && errors.email.message) || (errorObject && errorObject.email) || 'Unexpected error!'}
                </p>
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
              {(errors.password || (errorObject && errorObject.password)) && (
                <p className="form__input-error-message">
                  {(errors.password && errors.password.message) ||
                    (errorObject && errorObject.password) ||
                    'Unexpected error!'}
                </p>
              )}
            </div>
          </label>

          <label className="form__input-label">
            Avatar image
            <br />
            <input
              className={errors.image ? 'form__input form__input--border-red' : 'form__input'}
              placeholder="Avatar image"
              {...register('image', {
                pattern: {
                  value: urlRegExp,
                  message: 'Incorrect url',
                },
              })}
            />
            <div className="form__input-error">
              {(errors.image || (errorObject && errorObject.image)) && (
                <p className="form__input-error-message">
                  {(errors.image && errors.image.message) || (errorObject && errorObject.image) || 'Unexpected error!'}
                </p>
              )}
            </div>
            <div className="form__input-error">
              {((error && !errorObject) ||
                (errorObject &&
                  !errorObject.email &&
                  !errorObject.username &&
                  !errorObject.password &&
                  !errorObject.image)) && (
                <p className="form__input-error-message">Something went wrong, please try again later</p>
              )}
            </div>
          </label>

          <input className="form__submit-button" type="submit" value="Save" />
        </form>
      </div>
    </div>
  )
}
