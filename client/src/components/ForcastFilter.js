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
        <FilterInput name="max_temperature" />
        <FilterInput name="min_temperature" />
        <FilterInput name="max_windSpeed" />
        <FilterInput name="max_cloudCover" />
        <button type="button" onClick={this.handleReset}>reset</button>
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
