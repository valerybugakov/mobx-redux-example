import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { toggleFilter } from 'redux/main/actions'

@observer
export default class Filter extends Component {
  onChange = () => toggleFilter({ name: this.props.filterName })

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
