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

                                            // for <AnotherForm /> compat
    const value = data[`${name}Visible`] || data[name]

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
