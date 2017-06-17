import { observable } from 'mobx'
import { createReducer } from 'redux/utils'
import * as actions from './actions'

const initialState = observable({
  firstName: 'Redux',
  lastName: 'Mobx',
})

export default createReducer({
  [actions.setAnotherFormField](state, { name, value }) {
    state[name] = value
  },
}, initialState)
