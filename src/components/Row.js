import React, { Component } from 'react'
import styled from 'styled-components'
import { inject } from 'redux/utils'
import Field from './Field'
import Variations from './Variations'

const Container = styled.div`
  display: grid;
  margin: 10px 0;
  grid-template-columns: repeat(3, 2fr) repeat(4, 1fr);
  grid-auto-rows: 25px;

  & input {
    min-width: 150px;
    margin-right: 20px;
    font-size: 16px;
  }
`

@inject((_, {
  setField,
  setVariationField,
  addVariation,
  applyChanges,
  discardChanges,
}) => ({
  setField, setVariationField, addVariation, applyChanges, discardChanges,
}))
class Row extends Component {
  shouldComponentUpdate() {
    return false
  }

  addVariation = () => this.props.addVariation({ id: this.props.row.id })
  applyChanges =() => this.props.applyChanges({ id: this.props.row.id })
  discardChanges =() => this.props.discardChanges({ id: this.props.row.id })

  render() {
    const {
      row,
      setField,
      className,
      variationId,
      setVariationField,
    } = this.props

    const isVariationRow = typeof variationId !== 'undefined'

    return (
      <Container className={className}>
        {
          ['foo', 'bar', 'baz'].map(name => (
            <Field
              key={name}
              name={name}
              data={row}
              Component="input"
              variationId={variationId}
              onChange={isVariationRow ? setVariationField : setField}
            />
          ))
        }
        {
          ['check1', 'check2', 'check3', 'check4'].map(name => (
            <Field
              key={name}
              name={name}
              data={row}
              type="checkbox"
              Component="input"
              variationId={variationId}
              onChange={isVariationRow ? setVariationField : setField}
            />
          ))
        }
        <Field
          name="changesNumber"
          data={row}
          type="number"
          Component="input"
          disabled
        />

        <button onClick={this.addVariation}>Add variation</button>
        <button onClick={this.applyChanges}>Apply changes</button>
        <button onClick={this.discardChanges}>Discard changes</button>
        {!isVariationRow && <Variations rowId={row.id} />}
      </Container>
    )
  }
}

export default Row
