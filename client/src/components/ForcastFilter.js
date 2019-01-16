import React, { Component } from 'react';
import './ForcastFilter.css';
import FilterInput from './FilterInput';

class ForcastFilter extends Component {
  render() {
    return (
      <form className={'forcast-filter'}>
        <FilterInput name="max_temp" initialVal={80}/>
        <FilterInput name="min_temp" initialVal={65}/>
        <FilterInput name="max_wind" initialVal={10}/>
        <FilterInput name="max_cloud_cover" initialVal={20}/>
      </form>
    )
  }
}

export default ForcastFilter;
