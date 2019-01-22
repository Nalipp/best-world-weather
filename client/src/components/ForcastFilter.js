import React, { Component } from 'react';
import './ForcastFilter.css';
import FilterInput from './FilterInput';
import { connect } from 'react-redux';
import { resetFilters } from '../actions';

class ForcastFilter extends Component {
  handleReset = () => {
    console.log('handling reset...') 
  }
  render() {
    return (
      <form className={'forcast-filter'}>
        <FilterInput name="max_temperature" initialVal={80}/>
        <FilterInput name="min_temperature" initialVal={65}/>
        <FilterInput name="max_windSpeed" initialVal={10}/>
        <FilterInput name="max_cloudCover" initialVal={20}/>
        <button 
          type="button"
          onClick={this.handleReset}>reset</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(ForcastFilter);
