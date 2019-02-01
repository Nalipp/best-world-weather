import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideSingleForcast } from '../actions';
import WeatherIcon from './WeatherIcon';
import './ForcastDetail.css';

class ForcastDetail extends Component {
  render() {
    const forcast = this.props.singleForcast;
    return (
      <div>
        {forcast && <div className={'forcast-detail'}>
          <div className={`forcast-detail_heading`}>
            <h1>{forcast.cityName}</h1>
            <span>{Math.floor(forcast.apparentTemperature)}</span>
            <span><WeatherIcon size={'medium'} icon={forcast.icon}/></span>
          </div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleForcast: state.forcasts.singleForcast,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSingleForcast: () => dispatch(hideSingleForcast()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastDetail);
