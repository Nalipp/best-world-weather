import React, { Component } from 'react';
import './ForcastFilter.css';
import FilterInput from './FilterInput';
import { connect } from 'react-redux';
import { resetFilters, showFilters, hideFilters } from '../actions';

class ForcastFilter extends Component {
  handleReset = () => {
    this.props.resetFilters();
  }
  toggleDisplay = () => {
    const { displayFilters, hideFilters, showFilters } = this.props;
    displayFilters ? hideFilters() : showFilters();
  }
  render() {
    return (
      <form className={'forcast-filter'}>
        <div className={'forcast-filter_heading'}>
          <p onClick={this.toggleDisplay}>Filters</p>
          {this.props.displayResetButton &&
            <button 
              onClick={this.props.resetFilters}
              type="button">reset</button>}
        </div>
        {this.props.displayFilters &&
          <div>
            <FilterInput label="Max Temp" name="max_temperature" />
            <FilterInput label="Min Temp" name="min_temperature" />
            <FilterInput label="Max Wind" name="max_windSpeed" />
            <FilterInput label="Max Clouds" name="max_cloudCover" />
          </div>}
      </form>
    )
  }
}

const mapStateToProps = state => {
  let filters = state.forcasts.isShowing;
  let filterKeys = Object.keys(filters);
  return {
    displayResetButton: filterKeys.some(key => filters[key] === true),
    displayFilters: state.forcasts.displayFilters,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetFilters: () => dispatch(resetFilters()),
    showFilters: () => dispatch(showFilters()),
    hideFilters: () => dispatch(hideFilters()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastFilter);
