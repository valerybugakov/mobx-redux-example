import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { setField } from 'redux/main/actions'

@observer
export default class Field extends Component {
  onChange = ({ target }) => {
    const { row, name } = this.props
    const value = target.type === 'checkbox' ? target.checked : target.value

    setField({ id: row.id, name, value })
  }

  render() {
    const { Component: FieldComponent, name, row, type } = this.props
    const value = row[name]

    return (
      <FieldComponent
        type={type}
        value={value}
        checked={value}
        onChange={this.onChange}
      />
    )
  }
}
