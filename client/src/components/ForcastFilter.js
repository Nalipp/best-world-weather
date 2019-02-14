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
          <FilterInput label="Max Temp" name="max_temperature" />
          <FilterInput label="Min Temp" name="min_temperature" />
          <FilterInput label="Max Clouds" name="max_cloudCover" />
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
