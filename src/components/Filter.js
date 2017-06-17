import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class Filter extends Component {
  onChange = () => this.props.onChange({ name: this.props.filterName })

  render() {
    const { filterName, enabledFilters, className } = this.props

    return (
      <label className={className} htmlFor={filterName}>
        {filterName}
        <input
          type="checkbox"
          id={filterName}
          checked={enabledFilters.includes(filterName)}
          onChange={this.onChange}
        />
      </label>
    )
  }
}
