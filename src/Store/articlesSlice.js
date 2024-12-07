/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import getArticleList from '../ApiService/Articles/getArticleList'

export const fetchArticleList = createAsyncThunk('articles/fetchArticleList', async () => {
  const data = await getArticleList
  return { ...data }
})
const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articleList: {},
    // сделать из артикл лист мапу
    articlesCount: null,
    currentPage: 1,
    error: null,
    errorMessage: null,
    gettingInterval: null,
    status: null,
    token: null,
    totalPageCount: null,
  },
  reducers: {
    changeCurrentPage(state, action) {
      state.currentPage = action.payload.page
      state.articleList = { ...state.articleList, [state.currentPage]: null }
    },
    setGettingInterval(state, action) {
      if (!state.gettingInterval) {
        state.gettingInterval = action.payload.interval
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        if (state.status === null) {
          state.status = 'pending'
        }
        state.error = null
      })
      .addCase(fetchArticleList.fulfilled, (state, action) => {
        const body = action.payload
        state.articleList = { ...state.articleList, [state.currentPage]: body.articles }
        state.articlesCount = body.articlesCount
        state.status = 'fulfilled'
        state.totalPageCount = Math.ceil(body.articlesCount / 20)
      })
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.payload.errors.body.join('; ')
      })
  },
})

export default articlesSlice.reducer

export const { changeCurrentPage, setGettingInterval } = articlesSlice.actions