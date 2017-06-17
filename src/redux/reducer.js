import { combineReducers } from 'redux'
import main from './main/reducer'
import anotherForm from './another-form/reducer'

const rootReducer = combineReducers({ main, anotherForm })

export default rootReducer
