import './Profile.scss'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { nullifyProfileErrorObjectField, updateUserInfo } from '../../Store/userSlice'

export default function Profile() {
  const userObj = useSelector((state) => state.user.userObject)
  const error = useSelector((state) => state.user.error)
  const errorObject = useSelector((state) => state.user.profileErrorObject)
  const isProfileEdited = useSelector((state) => state.user.isProfileEdited)

  const dispatch = useDispatch()

  const inputOnchange = (field) => {
    if (errorObject && errorObject[field]) {
      dispatch(nullifyProfileErrorObjectField({ field }))
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profileUsername: userObj && userObj.username,
      profileEmail: userObj && userObj.email,
      profileImage: userObj && userObj.image,
    },
    mode: 'onBlur',
  })

  if (isProfileEdited) {
    return <Redirect to="/articles" />
  }
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
            if (data.profilePassword === '') {
              dispatch(
                updateUserInfo({ image: data.profileImage, email: data.profileEmail, username: data.profileUsername })
              )
            } else dispatch(updateUserInfo(data))
          })}
          className="form"
        >
          <label className="form__input-label">
            Username
            <br />
            <input
              className={errors.profileUsername ? 'form__input form__input--border-red' : 'form__input'}
              placeholder="Username"
              {...register('profileUsername', {
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
              onChange={() => {
                inputOnchange('username')
              }}
            />
            <div className="form__input-error">
              {(errors.profileUsername || (errorObject && errorObject.username)) && (
                <p className="form__input-error-message">
                  {(errors.profileUsername && errors.profileUsername.message) ||
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
              type="email"
              className={errors.profileEmail ? 'form__input form__input--border-red' : 'form__input'}
              placeholder="Email address"
              {...register('profileEmail', {
                required: 'Email address is required',
                pattern: { value: emailRegExp, message: 'Incorrect email address' },
              })}
              onChange={() => {
                inputOnchange('email')
              }}
            />
            <div className="form__input-error">
              {(errors.profileEmail || (errorObject && errorObject.email)) && (
                <p className="form__input-error-message">
                  {(errors.profileEmail && errors.profileEmail.message) ||
                    (errorObject && errorObject.email) ||
                    'Unexpected error!'}
                </p>
              )}
            </div>
          </label>

          <label className="form__input-label">
            New Password
            <br />
            <input
              type="password"
              className={errors.profilePassword ? 'form__input form__input--border-red' : 'form__input'}
              placeholder="New Password"
              {...register('profilePassword', {
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum length is 40',
                },
              })}
              onChange={() => {
                inputOnchange('password')
              }}
            />
            <div className="form__input-error">
              {(errors.profilePassword || (errorObject && errorObject.password)) && (
                <p className="form__input-error-message">
                  {(errors.profilePassword && errors.profilePassword.message) ||
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
              type="url"
              className={errors.profileImage ? 'form__input form__input--border-red' : 'form__input'}
              placeholder="Avatar image"
              {...register('profileImage', {
                pattern: {
                  value: urlRegExp,
                  message: 'Incorrect url',
                },
              })}
              onChange={() => {
                inputOnchange('image')
              }}
            />
            <div className="form__input-error">
              {(errors.profileImage || (errorObject && errorObject.image)) && (
                <p className="form__input-error-message">
                  {(errors.profileImage && errors.profileImage.message) ||
                    (errorObject && errorObject.image) ||
                    'Unexpected error!'}
                </p>
              )}
            </div>
            <div className="form__input-error">
              {error && !errorObject && (
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
