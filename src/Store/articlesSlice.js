/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import getArticleList from '../ApiService/Articles/getArticleList'
import getArticle from '../ApiService/Articles/getArticle'
import postArticle from '../ApiService/Articles/postArticle'
import updateArticle from '../ApiService/Articles/updateArticle'
import deleteArticle from '../ApiService/Articles/deleteArticle'
import favoriteArticle from '../ApiService/Articles/favoriteArticle'
import unfavoriteArticle from '../ApiService/Articles/unfavoriteArticle'

export const fetchArticleList = createAsyncThunk('articles/fetchArticleList', async (arg, thunkAPI) => {
  const state = thunkAPI.getState()
  const offset = (state.articles.currentPage - 1) * 20
  const data = offset !== 0 ? await getArticleList(offset) : await getArticleList()
  return data
})
export const fetchArticleWithSlug = createAsyncThunk('articles/fetchArticleWithSlug', async (arg) => {
  const data = await getArticle(arg)
  return data
})
export const deleteArticleWithSlug = createAsyncThunk('articles/deleteArticleWithSlug', async (arg) => {
  const data = await deleteArticle(arg)
  return data
})
export const editArticle = createAsyncThunk('articles/editArticle', async (arg) => {
  const { articleObject, slug } = arg
  const data = await updateArticle(articleObject, slug)
  return data
})
export const createNewArticle = createAsyncThunk('articles/createNewArticle', async (arg) => {
  const data = await postArticle(arg)
  return data
})
export const likeArticle = createAsyncThunk('articles/likeArticle', async (arg) => {
  const data = await favoriteArticle(arg)
  return data
})
export const dislikeArticle = createAsyncThunk('articles/dislikeArticle', async (arg) => {
  const data = await unfavoriteArticle(arg)
  return data
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articleList: {},
    articlesCount: null,
    currentPage: 1,
    currentArticleObject: null,
    error: null,
    errorMessage: null,
    errorObject: null,
    listStatus: null,
    articleStatus: null,
    isArticleCreatedOrEdited: false,
    token: null,
    totalPageCount: null,
    postStatus: null,
  },
  reducers: {
    changeCurrentPage(state, action) {
      state.currentPage = action.payload.page
      state.articleList = { ...state.articleList, [state.currentPage]: null }
    },
    changeCurrentArticle(state, action) {
      state.currentArticleObject = action.payload.article
    },
    falseIsArticleCreatedOrEdited(state) {
      state.isArticleCreatedOrEdited = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        state.listStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(fetchArticleList.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        }
        if (dataObj.articles) {
          state.articleList = { ...state.articleList, [state.currentPage]: dataObj.articles }
          state.articlesCount = dataObj.articlesCount
          state.listStatus = 'fulfilled'
          state.totalPageCount = Math.ceil(dataObj.articlesCount / 20)
        }
      })
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(fetchArticleWithSlug.pending, (state) => {
        state.articleStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(fetchArticleWithSlug.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        }
        if (dataObj.article) {
          state.currentArticleObject = action.payload.article
          state.articleStatus = 'fulfilled'
        }
      })
      .addCase(fetchArticleWithSlug.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(editArticle.pending, (state) => {
        state.postStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        }
        if (dataObj.article) {
          state.currentArticleObject = action.payload.article
          state.postStatus = 'fulfilled'
          state.isArticleCreatedOrEdited = true
        }
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(createNewArticle.pending, (state) => {
        state.postStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(createNewArticle.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        }
        if (dataObj.article) {
          state.currentArticleObject = action.payload.article
          state.postStatus = 'fulfilled'
          state.isArticleCreatedOrEdited = true
        }
      })
      .addCase(createNewArticle.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(deleteArticleWithSlug.pending, (state) => {
        state.postStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(deleteArticleWithSlug.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        } else {
          state.postStatus = 'fulfilled'
        }
      })
      .addCase(deleteArticleWithSlug.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(likeArticle.pending, (state) => {
        state.postStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        } else {
          state.postStatus = 'fulfilled'
        }
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(dislikeArticle.pending, (state) => {
        state.postStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(dislikeArticle.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        } else {
          state.postStatus = 'fulfilled'
        }
      })
      .addCase(dislikeArticle.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })
  },
})

export default articlesSlice.reducer

export const { changeCurrentPage, changeCurrentArticle, falseIsArticleCreatedOrEdited } = articlesSlice.actions
