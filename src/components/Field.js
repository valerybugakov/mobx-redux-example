import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class Field extends Component {
  onChange = ({ target }) => {
    const { data, name, onChange, variationId } = this.props
    const value = target.type === 'checkbox' ? target.checked : target.value

    onChange({ id: data.id, name, value, variationId })
  }

  render() {
    const {
      Component: FieldComponent,
      name,
      data,
      type,
      variationId,
      ...rest
    } = this.props

    let value = data[`${name}Visible`]

    if (typeof value === 'undefined') {
      value = data[name] // for <AnotherForm /> compat
    }

    return (
      <FieldComponent
        {...rest}
        type={type}
        value={value}
        checked={value}
        onChange={this.onChange}
      />
    )
  }
}
