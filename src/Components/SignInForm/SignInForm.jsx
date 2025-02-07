import React from 'react'
import './SignInForm.module.scss'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { nullifyLoginErrorObjectField, signIn } from '../../Store/userSlice'

export default function SignInForm() {
  const isRegistered = useSelector((state) => state.user.isRegistered)
  const errorObject = useSelector((state) => state.user.loginErrorObject)
  const dispatch = useDispatch()

  const inputOnchange = (field) => {
    if (errorObject && errorObject[field]) {
      dispatch(nullifyLoginErrorObjectField({ field }))
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const emailRegExp = /^\S+@\S+\.\S+$/

  if (isRegistered || localStorage.getItem('token')) {
    return <Redirect to="/articles" />
  }

  return (
    <div className="form-wrapper">
      <h2 className="form__title">Sign In</h2>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(signIn(data))
        })}
        className="form"
      >
        <label className="form__input-label">
          Email address
          <br />
          <input
            type="email"
            className={
              errors.email || (errorObject && errorObject.email) ? 'form__input form__input--border-red' : 'form__input'
            }
            placeholder="Email address"
            {...register('email', {
              required: 'Email address is required',
              pattern: { value: emailRegExp, message: 'Incorrect email address' },
            })}
            onChange={() => {
              inputOnchange('email')
            }}
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
          Password
          <br />
          <input
            type="password"
            className={
              errors.password || (errorObject && errorObject.password)
                ? 'form__input form__input--border-red'
                : 'form__input'
            }
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            onChange={() => {
              inputOnchange('password')
            }}
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
        <div className="form__input-error">
          {errorObject && !errorObject.password && !errorObject.email && (
            <p className="form__input-error-message">
              {(errorObject && 'Email or password is invalid') || 'Unexpected error!'}
            </p>
          )}
        </div>
        <input className="form__submit-button" type="submit" value="LogIn" />
      </form>
      <div className="form__footer">
        Don't have an account?{' '}
        <Link to="/sign-up">
          <span className="form__footer-link">Sign Up</span>
        </Link>
        .
      </div>
    </div>
  )
}
