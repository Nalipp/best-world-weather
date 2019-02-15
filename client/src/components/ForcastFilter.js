import React, { Component } from 'react';
import './ForcastFilter.css';
import FilterInput from './FilterInput';
import { connect } from 'react-redux';
import { resetFilters} from '../actions';

class ForcastFilter extends Component {
  handleReset = () => {
    this.props.resetFilters();
  }
  render() {
    return (
      <form className={'forcast-filter'}>
        <div className={'forcast-filter_heading'}>
          <p>Filters</p>
          {this.props.displayResetButton &&
            <button 
              onClick={this.props.resetFilters}
              type="button">reset</button>}
        </div>
        <div>
          <FilterInput 
            label="Min Temp"
            min={0}
            max={100}
            step={1}
            name="min_temperature" />
          <FilterInput
            label="Max Humidity"
            min={0}
            max={100}
            step={1}
            name="max_humidity" />
          <FilterInput
            label="Min Sunlight"
            min={8}
            max={14}
            step={0.1}
            name="min_sunlight" />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  let filters = state.forcasts.isShowing;
  let filterKeys = Object.keys(filters);
  return {
    displayResetButton: filterKeys.some(key => filters[key] === true),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetFilters: () => dispatch(resetFilters()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastFilter);
