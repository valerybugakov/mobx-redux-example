import store from './emptyStore'

// Action is binded to the store right after creation
export const createAction = type => {
  const action = payload => store.dispatch({ type, payload })
  action.toString = () => type
  action[Symbol.for('actionType')] = type

  return action
}

export const createReducer = (handlers = {}, defaultState) => (
  (state = defaultState, action = {}) => {
    const type = action[Symbol.for('actionType')] || action.type

    if (type && handlers[type]) {
      handlers[type](state, action.payload)
      return state
    }

    return state
  }
)
