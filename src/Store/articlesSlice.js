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
      })
      .addCase(fetchArticleList.fulfilled, (state, action) => {
        const body = action.payload
        state.articleList = { ...state.articleList, [state.currentPage]: body.articles }
        state.articlesCount = body.articlesCount
        state.listStatus = 'fulfilled'
        state.totalPageCount = Math.ceil(body.articlesCount / 20)
      })
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.payload.errors.body.join('; ')
      })
      .addCase(fetchArticleWithSlug.pending, (state) => {
        state.articleStatus = 'pending'
        state.error = null
        state.errorMessage = null
      })
      .addCase(fetchArticleWithSlug.fulfilled, (state, action) => {
        state.currentArticleObject = action.payload
        state.articleStatus = 'fulfilled'
      })
      .addCase(fetchArticleWithSlug.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.payload.errors.body.join('; ')
      })
  },
})

export default articlesSlice.reducer

export const { changeCurrentPage, changeCurrentArticle } = articlesSlice.actions
