import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articlesSlice'
import userSlice from './userSlice'

const appStore = configureStore({
  reducer: {
    articles: articlesSlice,
    user: userSlice,
  },
})
export default appStore
