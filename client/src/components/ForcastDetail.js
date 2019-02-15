import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherIcon from './WeatherIcon';
import WeatherIconList from './WeatherIconList';
import './ForcastDetail.css';

class ForcastDetail extends Component {
  render() {
    const { singleForcast, filteredForcasts} = this.props;
    let forcast;

    if (singleForcast) {
      forcast = singleForcast;
    } else if (filteredForcasts) {
      forcast = filteredForcasts[0];
    }

    console.log(forcast);
    return (
      <div>
        {forcast && <div className={'forcast-detail'}>
          <div className={`forcast-detail_heading`}>
            <h1>{forcast.cityName}</h1>
            <span>{Math.floor(forcast.apparentTemperature)}</span>
            <span><WeatherIcon size={'medium'} icon={forcast.icon}/></span>
          </div>
          <ul>
            <div className={`forcast-detail_list-heading`}>
              <h2>Upcomming forcast</h2>
              <WeatherIconList allIcons={forcast.allIcons} size="medium" />
            </div>
            <li>
              <p>Average max</p>
              <p>{forcast.averageMaxTemp}</p>
            </li>
            <li>
              <p>Average min</p>
              <p>{forcast.averageMinTemp}</p>
            </li>
            <li>
              <p>Average feels like</p>
              <p>{forcast.averageApparentTemperatureMaxMin}</p>
            </li>
            <li>
              <p>Total sunlight hours</p>
              <p>{forcast.sunlightHours}</p>
            </li>
          </ul>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleForcast: state.forcasts.singleForcast,
    filteredForcasts: state.forcasts.filteredForcasts,
  }
}

export default connect(mapStateToProps, null)(ForcastDetail);
