import React, { useEffect, useState } from 'react'
import './ArticleForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { fetchArticleWithSlug } from '../../Store/articlesSlice'

export default function ArticleForm({ type = 'edit', slug = 'r' }) {
  const dispatch = useDispatch()
  const errorObject = useSelector((state) => state.articles.errorObject)
  const status = useSelector((state) => state.articles.articleStatus)
  // const articleObj = useSelector((state) => state.articles.currentArticleObject)
  const articleObj = {
    title: 'Article title',
    slug: 'article-slug',
    description: 'Article description',
    body: 'Article big text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text',
    tags: ['one', 'two', 'three', 'for', 'five'],
  }

  useEffect(() => {
    if (type === 'edit' && slug && (!articleObj || articleObj.slug !== slug)) {
      dispatch(fetchArticleWithSlug(slug))
    }
  }, [slug, articleObj, type])
  if (type === 'edit' && !slug) {
    throw new Error('Slug is required!')
  }

  /* eslint-disable */
  const [tagsObj, setTagsObj] = useState(
    articleObj && articleObj.tags
      ? {
        maxId: articleObj.tags.length,
        tag0: '',
        tagsArray: articleObj.tags.map((tag, index) => ({
          id: index + 1,
          tag,
        })),
      }
      : null
  )
  /* eslint-enable */
  const tagsArrayToDefaultValueObject = (obj) => {
    if (obj) {
      const tags = obj.tagsArray
      const tagsObject = {}
      tags.forEach((tag) => {
        tagsObject[`tag${tag.id}`] = tag.tag
      })
      return tagsObject
    }
  }

  const defaultValues = {
    title: (articleObj && articleObj.title) || null,
    body: (articleObj && articleObj.body) || null,
    description: (articleObj && articleObj.description) || null,
    ...tagsArrayToDefaultValueObject(tagsObj),
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    // defaultValues: type === 'edit' ? defaultValues : null,
    defaultValues,
  })

  const tagsToInputs = (tagsObject) => {
    if (tagsObject && tagsObject.tagsArray) {
      return tagsObject.tagsArray.map((tag) => {
        const deleteOnclick = (e) => {
          e.preventDefault()
          const { id } = e.target
          setTagsObj((stateObj) => {
            const tagsArray = stateObj.tagsArray.filter((t) => t.id.toString() !== id)
            return { ...stateObj, tagsArray }
          })
        }
        const onTagChange = (e) => {
          setTagsObj((stateObj) => {
            const { tagsArray } = stateObj
            const editedTag = tagsArray.filter((t) => t.id === tag.id)[0]
            const editedTagIndex = tagsArray.indexOf(editedTag)
            const newTagsArray = [
              ...tagsArray.slice(0, editedTagIndex),
              { id: tag.id, tag: e.target.value },
              ...tagsArray.slice(editedTagIndex + 1),
            ]
            return { ...stateObj, tagsArray: newTagsArray }
          })
        }
        return (
          <div className="article-form__tag-input-wrapper form__tag-input-wrapper" key={`tag${tag.id}`}>
            <input
              className="form__input article-form__input article-form__input--tag"
              {...register(`tag${tag.id}`)}
              placeholder="Tag"
              value={tag.tag}
              onChange={onTagChange}
            />
            <button
              className="article-form__button form__button article-form__button--delete"
              id={tag.id}
              onClick={deleteOnclick}
            >
              Delete
            </button>
          </div>
        )
      })
    }
    return null
  }

  let title
  if (type === 'new') {
    title = 'Create new article'
  } else if (type === 'edit') {
    title = 'Edit article'
  }

  const addTagOnclick = (e) => {
    e.preventDefault()
    setTagsObj((stateObj) => {
      const tagsArray = [...stateObj.tagsArray]
      tagsArray.push({ id: stateObj.maxId + 1, tag: '' })
      return { ...stateObj, tagsArray, maxId: stateObj.maxId + 1 }
    })
  }
  const tags = type === 'edit' ? tagsToInputs(tagsObj) : <input />

  return (
    <div className="form-wrapper article-form">
      <h2 className="form__title">title: {title}</h2>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          console.log(data)
        })}
      >
        <label className="form__input-label">
          Title:
          <input
            className="form__input article-form__input"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
          />
          <div className="form__input-error">
            {(errors.title || (errorObject && errorObject.title)) && (
              <p className="form__input-error-message">
                {(errors.title && errors.title.message) || (errorObject && errorObject.title) || 'Unexpected error!'}
              </p>
            )}
          </div>
        </label>
        <label className="form__input-label">
          Short description:
          <input className="form__input article-form__input" placeholder="Description" {...register('description')} />
          <div className="form__input-error">
            {(errors.description || (errorObject && errorObject.description)) && (
              <p className="form__input-error-message">
                {(errors.description && errors.description.message) ||
                  (errorObject && errorObject.description) ||
                  'Unexpected error!'}
              </p>
            )}
          </div>
        </label>
        <label className="form__input-label">
          Text:
          <textarea
            className="form__input article-form__input article-form__input--text-area"
            placeholder="Text"
            {...register('body', { required: 'Text is required' })}
          />
          <div className="form__input-error">
            {(errors.body || (errorObject && errorObject.body)) && (
              <p className="form__input-error-message">
                {(errors.body && errors.body.message) || (errorObject && errorObject.body) || 'Unexpected error!'}
              </p>
            )}
          </div>
        </label>
        <label className="form__input-label">
          Tags:
          {tags}
          <div className="article-form__tag-input-wrapper form__tag-input-wrapper" key="tag0">
            <input
              className="form__input article-form__input article-form__input--tag"
              {...register('tag0')}
              placeholder="Tag"
              onChange={null}
              value={tagsObj.tag0}
            />
            <button
              className="article-form__button form__button article-form__button--delete"
              id="0"
              onClick={(e) => {
                e.preventDefault()
                setTagsObj((stateObj) => ({ ...stateObj, tag0: '' }))
              }}
            >
              Delete
            </button>
            <button className="article-form__button form__button" onClick={addTagOnclick}>
              Add Tag
            </button>
          </div>
          <div className="form__input-error">
            {(errors.tags || (errorObject && errorObject.tags)) && (
              <p className="form__input-error-message">
                {(errors.tags && errors.tags.message) || (errorObject && errorObject.tags) || 'Unexpected error!'}
              </p>
            )}
          </div>
        </label>

        <input className="form__submit-button article-form__submit-button" type="submit" value="Create" />
      </form>
    </div>
  )
}
