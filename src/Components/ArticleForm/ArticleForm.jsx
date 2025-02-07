import React, { useEffect, useState } from 'react'
import './ArticleForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ScaleLoader } from 'react-spinners'
import { Redirect, useParams } from 'react-router-dom'

import { createNewArticle, editArticle, fetchArticleWithSlug } from '../../Store/articlesSlice'

function ArticleFormContent({ articleObj, slug }) {
  const errorObject = useSelector((state) => state.articles.errorObject)
  const dispatch = useDispatch()
  const isArticleCreatedOrEdited = useSelector((state) => state.articles.isArticleCreatedOrEdited)

  let title
  if (slug) {
    title = 'Edit article'
  } else title = 'Create new article'

  /* eslint-disable */
  const [tagsObj, setTagsObj] = useState(
    slug && articleObj && articleObj.tagList
      ? {
        maxId: articleObj.tagList.length,
        tagsArray: articleObj.tagList.map((tag, index) => ({
          id: index + 1,
          tag,
        })),
      }
      : {
        maxId: 1,
        tagsArray: [{ id: 1, tag: '' }],
      }
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
    defaultValues: slug ? defaultValues : null,
  })

  if (isArticleCreatedOrEdited) {
    return <Redirect to="/articles" />
  }

  const tagsToInputs = (tagsObject) =>
    tagsObject.tagsArray.map((tag) => {
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

  const addTagOnclick = (e) => {
    e.preventDefault()
    setTagsObj((stateObj) => {
      const tagsArray = [...stateObj.tagsArray]
      tagsArray.push({ id: stateObj.maxId + 1, tag: '' })
      return { ...stateObj, tagsArray, maxId: stateObj.maxId + 1 }
    })
  }
  const tags = tagsToInputs(tagsObj)

  return (
    <div className="form-wrapper article-form">
      <h2 className="form__title">{title}</h2>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          const { tagsArray } = tagsObj
          const newTagsArray = []
          tagsArray.forEach((tagObj) => {
            if (tagObj.tag !== '') {
              newTagsArray.push(tagObj.tag)
            }
          })
          const argObj = {
            article: {
              title: data.title,
              description: data.description,
              body: data.body,
              tagList: newTagsArray,
            },
          }
          if (!slug) {
            dispatch(createNewArticle(argObj))
          }
          if (slug) {
            dispatch(editArticle({ articleObject: argObj, slug: articleObj.slug }))
          }
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
          <input
            className="form__input article-form__input"
            placeholder="Description"
            {...register('description', {
              required: 'Description is required',
            })}
          />
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
          <button className="article-form__button form__button article-form__button--add" onClick={addTagOnclick}>
            Add Tag
          </button>
          <div className="form__input-error">
            {(errors.tags || (errorObject && errorObject.tags)) && (
              <p className="form__input-error-message">
                {(errors.tags && errors.tags.message) || (errorObject && errorObject.tags) || 'Unexpected error!'}
              </p>
            )}
          </div>
        </label>

        <input className="form__submit-button article-form__submit-button" type="submit" value="Send" />
      </form>
    </div>
  )
}
export default function ArticleForm() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.articles.articleStatus)
  const error = useSelector((state) => state.articles.error)
  const errorMessage = useSelector((state) => state.articles.errorMessage)
  const articleObj = useSelector((state) => state.articles.currentArticleObject)
  const currentUser = useSelector((state) => state.user.userObject)
  const { slug } = useParams()

  useEffect(() => {
    if (slug && slug && (!articleObj || articleObj.slug !== slug)) {
      dispatch(fetchArticleWithSlug(slug))
    }
  }, [slug])
  if (!localStorage.getItem('token')) {
    return <Redirect to="/sign-in" />
  }
  if (error && errorMessage) {
    throw new Error(errorMessage)
  }
  if (
    slug &&
    articleObj &&
    slug === articleObj.slug &&
    currentUser &&
    currentUser.username !== articleObj.author.username
  ) {
    throw new Error('This is not your article, you can not edit it.')
  }
  if (slug && (!articleObj || status === 'pending')) {
    return (
      <div className="spin">
        <ScaleLoader color="#1890ff" />
      </div>
    )
  }
  return <ArticleFormContent articleObj={articleObj} slug={slug} />
}
