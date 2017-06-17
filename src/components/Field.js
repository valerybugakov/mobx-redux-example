import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class Field extends Component {
  onChange = ({ target }) => {
    const { data, name, onChange } = this.props
    const value = target.type === 'checkbox' ? target.checked : target.value

    onChange({ id: data.id, name, value })
  }

  render() {
    const { Component: FieldComponent, name, data, type } = this.props
    const value = data[name]

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
