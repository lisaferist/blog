/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import getArticleList from '../ApiService/Articles/getArticleList'
import getArticle from '../ApiService/Articles/getArticle'

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
    token: null,
    totalPageCount: null,
  },
  reducers: {
    changeCurrentPage(state, action) {
      state.currentPage = action.payload.page
      state.articleList = { ...state.articleList, [state.currentPage]: null }
    },
    changeCurrentArticle(state, action) {
      state.currentArticleObject = action.payload.article
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
  },
})

export default articlesSlice.reducer

export const { changeCurrentPage, changeCurrentArticle } = articlesSlice.actions
