import React, { Component } from 'react';
import './ForcastFilter.css';
import FilterInput from './FilterInput';
import { connect } from 'react-redux';
import { resetFilters } from '../actions';

class ForcastFilter extends Component {
  handleReset = () => {
    this.props.resetFilters();
  }
  render() {
    return (
      <form className={'forcast-filter'}>
        <div>
          <p>Filters</p>
          <button type="button" onClick={this.handleReset}>reset</button>
        </div>
        <FilterInput label="Max Temp" name="max_temperature" />
        <FilterInput label="Min Temp" name="min_temperature" />
        <FilterInput label="Max Wind" name="max_windSpeed" />
        <FilterInput label="Max Clouds" name="max_cloudCover" />
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetFilters: () => dispatch(resetFilters()),
  }
}

export default connect(null, mapDispatchToProps)(ForcastFilter);
