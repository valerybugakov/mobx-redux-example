import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { inject } from 'redux/utils'
import { addRow } from 'redux/main/actions'
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

const Home = ({ rows, filters }) => (
  <Container>
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

export default inject(state => ({
  rows: state.main.visibleRows,
  filters: state.main.filters,
}))(observer(Home))
