import { observable, autorun, extendObservable } from 'mobx'
import { createReducer } from 'redux/utils'
import * as actions from './actions'

window.autorun = autorun
window.observable = observable
window.extendObservable = extendObservable

const rowProps = ['foo', 'bar', 'baz', 'check1', 'check2', 'check3', 'check4']
const publicGetters = () => rowProps.reduce((acc, key) =>
  Object.defineProperty(acc, `${key}Visible`, {
    enumerable: true,
    configurable: true,
    get() {
      if (this.changes && this.changes.has(key)) {
        return this.changes.get(key)
      }

      return this[key]
    },
  }), {})

const createNewRow = idx => observable({
  id: idx,
  foo: `foo-${idx}`,
  bar: `bar-${idx}`,
  baz: `baz-${idx}`,
  check1: idx % 2 === 0,
  check2: idx % 3 === 0,
  check3: idx % 4 === 0,
  check4: idx % 5 === 0,

  changes: observable.map({}),
  get changesNumber() {
    return this.changes.size
  },
  // get visibleValues() {
  //   return Object.entries(this).reduce((acc, [key, value]) => ({
  //     ...acc,
  //     [key]: this.changes.get(key) || value,
  //   }), {})
  // },
})

const initialState = observable({
  variations: observable.map({}),
  rows: Array.from({ length: 25 }).map((_, idx) =>
    extendObservable(createNewRow(idx), publicGetters())
  ),
  filters: [],

  // Lazy computed property updates itself if has observers and
  // any observable used inside of the getter changes
  get visibleRows() {
    const { rows, filters } = this

    if (!filters.length) return rows
    return rows.filter(row => filters.every(filter => row[`${filter}Visible`]))
  },
})

export default createReducer({
  [actions.addRow]({ rows }) {
    rows.push(createNewRow(rows.length))
  },
  [actions.setField]({ rows }, { id, name, value }) {
    rows[id].changes.set(name, value)
  },
  [actions.applyChanges]({ rows }, { id }) {
    const target = rows[id]
    target.changes.forEach((value, key) => target[key] = value)
    target.changes.clear()
  },
  [actions.discardChanges]({ rows }, { id }) {
    rows[id].changes.clear()
  },
  [actions.toggleFilter]({ filters }, { name }) {
    const index = filters.indexOf(name)
    index === -1 ? filters.push(name) : filters.splice(index, 1)
  },
  [actions.addVariation]({ variations, rows }, { id }) {
    if (!variations.has(id)) {
      variations.set(id, [])
    }

    variations.get(id).push({ ...rows[id] })
  },
  [actions.setVariationField](state, { id, name, value, variationId }) {
    state.variations.get(id)[variationId][name] = value
  },
}, initialState)
