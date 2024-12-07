import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articlesSlice'

const appStore = configureStore({
  reducer: {
    articles: articlesSlice,
  },
})
export default appStore
