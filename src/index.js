import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './Components/App'
import appStore from './Store'
import Profile from './Components/Profile'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <Route path="/profile" component={Profile} exact />
      <Route path="/" component={App} exact />
    </BrowserRouter>
  </Provider>
)
