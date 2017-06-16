import React, { Component } from 'react'
import styled from 'styled-components'
import Field from './Field'

const Container = styled.div`
  display: grid;
  margin: 10px 0;
  grid-template-columns: repeat(3, 2fr) repeat(4, 1fr);
  grid-auto-rows: 25px;

  & > input {
    min-width: 150px;
    margin-right: 20px;
    font-size: 16px;
  }
`

class Row extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { row, className } = this.props

    return (
      <Container className={className}>
        {
          ['foo', 'bar', 'baz'].map(name => (
            <Field
              key={name}
              name={name}
              row={row}
              Component="input"
            />
          ))
        }
        {
          ['check1', 'check2', 'check3', 'check4'].map(name => (
            <Field
              key={name}
              name={name}
              row={row}
              Component="input"
              type="checkbox"
            />
          ))
        }
      </Container>
    )
  }
}

export default Row
