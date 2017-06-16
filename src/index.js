import 'global.styles'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import store from 'redux/store'
import Root from 'components/Root'

const renderApp = () => render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root'),
)

renderApp()

if (module.hot) {
  module.hot.accept('components/Root', renderApp)
}
