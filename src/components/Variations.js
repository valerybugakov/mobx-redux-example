/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { inject } from 'redux/utils'
import Row from './Row'

@inject((state, actions, { rowId }) => ({
  variations: state.main.variations.get(rowId),
}))
@observer
class Variations extends Component {
  render() {
    const { variations } = this.props

    return (
      <div>
        {
          variations &&
          variations.map((row, idx) =>
            <Row key={`${row.id}_${idx}`} variationId={idx} row={row} />
          )
        }
      </div>
    )
  }
}

export default Variations
