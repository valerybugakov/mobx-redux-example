import { path } from 'ramda'
import { action } from 'mobx'
import { createStore, applyMiddleware, compose } from 'redux'
import { unboxProps } from './inject'

// Transaction middleware for multiple Mobx updates by caused by one action
const transaction = () => next => reduxAction => {
  if (!reduxAction.type) {
    throw new Error('Apply this middleware at last position')
  }

  // remove synthetic events from the payload
  if (path(['payload', 'nativeEvent'], reduxAction)) {
    reduxAction.payload = undefined
  }

  action(() => next(reduxAction))()
}

let composeEnhancers = compose
const middlewares = [transaction]

// Use redux-devtools if available, otherwise enable redux-logger
if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-underscore-dangle, global-require */
  if (
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  } else {
    const createLogger = require('redux-logger').createLogger
    const logger = createLogger({
      collapsed: true,
      stateTransformer: state => unboxProps(Object.assign({}, state)),
    })

    middlewares.push(logger)
  }
  /* eslint-enable no-underscore-dangle */
}

// Initialize with dummy reducer first
const emptyStore = createStore(
  () => {},
  composeEnhancers(applyMiddleware(...middlewares)),
)

// Allow to explore state from the console
window.store = emptyStore

export default emptyStore
