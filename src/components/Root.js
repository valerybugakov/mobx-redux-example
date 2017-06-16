import React from 'react'
import { Provider } from 'mobx-react'
import { Router, Route } from 'react-router-dom'
import { history } from 'redux/store'
import Home from 'components/Home'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  </Provider>
)

export default Root
