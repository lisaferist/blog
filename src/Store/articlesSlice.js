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

export const fetchArticle = createAsyncThunk('articles/fetchArticleList', async (arg) => {
  console.log('UUUUUUUUUUU')
  const { slug } = arg
  const data = await getArticle(slug)
  return data
})
const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articleList: {},
    articlesCount: null,
    currentPage: 1,
    currentArticleObject: {
      slug: 'how-to-train-your-dragon',
      title: 'How to train your dragon',
      description: 'Ever wonder how?',
      body: 'It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a JacobianIt takes a JacobianIt It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a JacobianIt takes a JacobianIt It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a JacobianIt takes a JacobianIt It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a JacobianIt takes a JacobianIt  takes a JacobianIt takes a JacobianIt takes a JacobianIt takes a Jacobian It takes a Jacobian It  It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a JacobianIt takes a JacobianIt takes a JacobianIt takes a JacobianIt takes a JacobianIt takes a Jacobian It takes a Jacobian It  It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian It takes a Jacobian takes a Jacobian It takes a Jacobian It takes a Jacobian',
      tags: ['dragons', 'training'],
      createdAt: '2023-05-04T09:42:00+00:00',
      updatedAt: '2023-05-04T09:42:00+00:00',
      favorited: false,
      favoritesCount: 42,
      author: {
        username: 'jake',
        bio: 'I work at State Farm.',
        image: 'https://api.realworld.io/images/smiley-cyrus.jpg',
        following: false,
      },
    },
    error: null,
    errorMessage: null,
    status: null,
    token: null,
    totalPageCount: null,
  },
  reducers: {
    changeCurrentPage(state, action) {
      state.currentPage = action.payload.page
      state.articleList = { ...state.articleList, [state.currentPage]: null }
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
    // .addCase(fetchArticle.pending, (state) => {
    //   if (state.status === null) {
    //     state.status = 'pending'
    //   }
    //   state.error = null
    // })
    // .addCase(fetchArticle.fulfilled, (state, action) => {
    //   state.currentArticleObject = action.payload
    //   state.status = 'fulfilled'
    // })
    // .addCase(fetchArticle.rejected, (state, action) => {
    //   state.error = true
    //   state.errorMessage = action.payload.errors.body.join('; ')
    // })
  },
})

export default articlesSlice.reducer

export const { changeCurrentPage, setError } = articlesSlice.actions
