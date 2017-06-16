import createHistory from 'history/createBrowserHistory'
import store from './utils/emptyStore'
import rootReducer from './reducer'

export const history = createHistory()

const updateReducer = () => store.replaceReducer(rootReducer)
updateReducer()

if (module.hot) {
  module.hot.accept('./reducer', updateReducer)
}

export default store
