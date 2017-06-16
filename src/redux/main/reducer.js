import { observable } from 'mobx'
import { createReducer } from 'redux/utils'
import * as actions from './actions'

const createNewRow = idx => ({
  id: idx,
  foo: `foo-${idx}`,
  bar: `bar-${idx}`,
  baz: `baz-${idx}`,
  check1: idx % 2 === 0,
  check2: idx % 3 === 0,
  check3: idx % 4 === 0,
  check4: idx % 5 === 0,
})

const initialState = observable({
  rows: Array.from({ length: 25 }).map((_, idx) => createNewRow(idx)),
  filters: [],

  // Lazy computed property updates itself if has observers and
  // any observable used inside of the getter changes
  get visibleRows() {
    const { rows, filters } = this

    if (!filters.length) return rows
    return rows.filter(row => filters.every(filter => row[filter]))
  },
})

export default createReducer({
  [actions.addRow](state) {
    state.rows.push(createNewRow(state.rows.length))
  },
  [actions.setField](state, { id, name, value }) {
    state.rows[id][name] = value
  },
  [actions.toggleFilter]({ filters }, { name }) {
    const index = filters.indexOf(name)
    index === -1 ? filters.push(name) : filters.splice(index, 1)
  },
}, initialState)
