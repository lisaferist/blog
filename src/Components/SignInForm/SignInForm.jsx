import React from 'react'
import './SignInForm.module.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  console.log(errors)

  const emailRegExp = /^\S+@\S+\.\S+$/

  return (
    <div className="form-wrapper">
      <h2 className="form__title">Sign In</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data)
        })}
        className="form"
      >
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
            {errors.email && <p className="form__input-error-message">{errors.email.message || 'Unexpected error!'}</p>}
          </div>
        </label>
        <label className="form__input-label">
          Password
          <br />
          <input
            className={errors.password ? 'form__input form__input--border-red' : 'form__input'}
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          <div className="form__input-error">
            {errors.password && (
              <p className="form__input-error-message">{errors.password.message || 'Unexpected error!'}</p>
            )}
          </div>
        </label>
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
