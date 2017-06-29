import { createAction } from 'redux/utils'

export const addRow = createAction('Add row')

export const setField = createAction('Set field')
export const applyChanges = createAction('Apply changes')
export const discardChanges = createAction('Discard changes')

export const toggleFilter = createAction('Toggle filter')

export const addVariation = createAction('Add variation')
export const setVariationField = createAction('Set variation field')
