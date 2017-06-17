import React, { Component } from 'react'
import styled from 'styled-components'
import { inject } from 'redux/utils'
import Field from './Field'

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

@inject((_, { setField }) => ({ setField }))
class Row extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { row, className, setField } = this.props

    return (
      <Container className={className}>
        {
          ['foo', 'bar', 'baz'].map(name => (
            <Field
              key={name}
              name={name}
              data={row}
              Component="input"
              onChange={setField}
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
              onChange={setField}
            />
          ))
        }
      </Container>
    )
  }
}

export default Row
