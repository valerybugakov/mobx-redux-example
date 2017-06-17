import React from 'react'
import { compose } from 'ramda'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { inject } from 'redux/utils'
import AnotherForm from './AnotherForm'
import Filter from './Filter'
import Row from './Row'

const Container = styled.div`
  margin: 10px 20px;
`
const FilterContainer = styled.div`
  display: grid;
  margin-top: 15px;
  grid-template-columns: 6fr repeat(4, 1fr);
  grid-auto-rows: 25px;
`
const AddButton = styled.button`
  margin-left: 15px;
  font-size: 14px;
`

const Home = ({ rows, filters, addRow, toggleFilter }) => (
  <Container>
    <AnotherForm />
    <div>
      Total rows: {rows.length}
      <AddButton onClick={addRow}>Add row</AddButton>
    </div>
    <FilterContainer>
      <div>Show rows only with checked:</div>
      {
        ['check1', 'check2', 'check3', 'check4'].map(filterName => (
          <Filter
            key={filterName}
            onChange={toggleFilter}
            filterName={filterName}
            enabledFilters={filters}
          />
        ))
      }
    </FilterContainer>
    <div>
      {rows.map(row => <Row key={row.id} row={row} />)}
    </div>
  </Container>
)

export default compose(
  inject((state, { addRow, toggleFilter }) => ({
    addRow,
    toggleFilter,
    filters: state.main.filters,
    rows: state.main.visibleRows,
  })),
  observer,
)(Home)
