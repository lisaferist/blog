/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import registerNewUser from '../ApiService/User/registerNewUser'
import loginExistingUser from '../ApiService/User/loginExistingUser'
import getCurrentUser from '../ApiService/User/getCurrentUser'
import updateCurrentUser from '../ApiService/User/updateCurrentUser'

export const signUp = createAsyncThunk('user/signUp', async (arg) => {
  const data = await registerNewUser({
    user: {
      username: arg.username,
      email: arg.email,
      password: arg.password,
    },
  })
  return data
})

export const signIn = createAsyncThunk('user/signIn', async (arg) => {
  const data = await loginExistingUser({
    user: {
      email: arg.email,
      password: arg.password,
    },
  })
  return data
})

export const getUserByToken = createAsyncThunk('user/getUserByToken', async () => {
  const data = await getCurrentUser()
  return data
})

export const updateUserInfo = createAsyncThunk('user/updateUserInfo', async (arg) => {
  const data = await updateCurrentUser(arg)
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    error: null,
    errorMessage: null,
    errorObject: null,
    profileErrorObject: null,
    loginErrorObject: null,
    registerErrorObject: null,
    isRegistered: false,
    userObject: null,
    userStatus: null,
    isProfileEdited: false,
  },
  reducers: {
    logOut(state) {
      state.user = null
      state.isRegistered = false
      localStorage.removeItem('token')
      state.error = null
      state.errorMessage = null
      state.errorObject = null
    },
    falseIsProfileEdited(state) {
      state.isProfileEdited = false
    },
    nullifyProfileErrorObjectField(state, action) {
      state.profileErrorObject[action.payload.field] = null
    },
    nullifyLoginErrorObjectField(state, action) {
      state.loginErrorObject[action.payload.field] = null
    },
    nullifyRegisterErrorObjectField(state, action) {
      state.registerErrorObject[action.payload.field] = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        localStorage.removeItem('token')
        state.userStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.registerErrorObject = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.registerErrorObject = dataObj.errors
        }
        if (dataObj.user) {
          state.userObject = dataObj.user
          localStorage.setItem('token', dataObj.user.token)
          state.userStatus = 'fulfilled'
          state.isRegistered = true
          state.error = null
          state.errorMessage = null
          state.registerErrorObject = null
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(signIn.pending, (state) => {
        localStorage.removeItem('token')
        state.userStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.loginErrorObject = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.loginErrorObject = dataObj.errors
        }
        if (dataObj.user) {
          state.userObject = dataObj.user
          localStorage.setItem('token', dataObj.user.token)
          state.userStatus = 'fulfilled'
          state.isRegistered = true
          state.error = null
          state.errorMessage = null
          state.loginErrorObject = null
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
      })

      .addCase(getUserByToken.pending, (state) => {
        state.userStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.errorObject = null
      })
      .addCase(getUserByToken.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.errorObject = dataObj.errors
        }
        if (dataObj.user) {
          state.userObject = dataObj.user
          localStorage.setItem('token', dataObj.user.token)
          state.userStatus = 'fulfilled'
          state.isRegistered = true
          state.error = null
          state.errorMessage = null
          state.errorObject = null
        }
      })
      .addCase(getUserByToken.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
        state.user = null
        state.isRegistered = false
        localStorage.removeItem('token')
      })

      .addCase(updateUserInfo.pending, (state) => {
        state.userStatus = 'pending'
        state.error = null
        state.errorMessage = null
        state.profileErrorObject = null
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const dataObj = action.payload
        if (dataObj.errors) {
          state.error = true
          state.profileErrorObject = dataObj.errors
        }
        if (dataObj.user) {
          state.userObject = dataObj.user
          state.userStatus = 'fulfilled'
          state.isProfileEdited = true
          state.isRegistered = true
          state.error = null
          state.errorMessage = null
          state.profileErrorObject = null
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = true
        state.errorMessage = action.error.message
        state.user = null
      })
  },
})

export default userSlice.reducer
export const {
  logOut,
  falseIsProfileEdited,
  nullifyLoginErrorObjectField,
  nullifyProfileErrorObjectField,
  nullifyRegisterErrorObjectField,
} = userSlice.actions
