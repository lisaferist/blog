import React from 'react'
import './SignUpForm.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  console.log(errors.repeatedPassword)

  return (
    <div className="form-wrapper">
      <h2 className="form__title">Create new account</h2>
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
                message: 'Minimum length is 3',
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
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Incorrect email address' },
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
            {...register('password', {
              required: 'Password is required',
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
          Repeat Password
          <br />
          <input
            className={errors.repeatedPassword ? 'form__input form__input--border-red' : 'form__input'}
            placeholder="Password"
            {...register('repeatedPassword', {
              required: 'Password is required',
              validate: { passwordsMatch: (value) => value === watch('password') },
            })}
          />
          <div className="form__input-error">
            {errors.repeatedPassword && (
              <p className="form__input-error-message">
                {errors.repeatedPassword.message ||
                  (errors.repeatedPassword.type === 'passwordsMatch' && 'Passwords must match') ||
                  'Unexpected error!'}
              </p>
            )}
          </div>
        </label>
        <label className="form__checkbox-label">
          <input
            className="form__checkbox"
            type="checkbox"
            {...register('consentCheckbox', { required: 'It is impossible to create an account without this consent' })}
          />
          <span className="form__checkbox-text">I agree to the processing of my personal information</span>
        </label>
        <div className="form__input-error">
          {errors.consentCheckbox && (
            <p className="form__input-error-message">{errors.consentCheckbox.message || 'Unexpected error!'}</p>
          )}
        </div>
        <input className="form__submit-button" type="submit" value="Create" />
      </form>
      <div className="form__footer">
        Already have an account?{' '}
        <Link to="/sign-in">
          <span className="form__footer-link"> Sign In</span>
        </Link>
        .
      </div>
    </div>
  )
}
