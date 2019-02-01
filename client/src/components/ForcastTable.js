import React, { Component } from 'react';
import './ForcastTable.css';
import { connect } from 'react-redux';
import { setSortedBy, setSingleForcast } from '../actions';
import WeatherIcon from './WeatherIcon';

const WeatherIconListItem = (allIcons) => {
  return allIcons.map((icon, idx) => {
    if (idx < 5) {
      return <li key={idx}><WeatherIcon icon={icon} /></li>
    } else {
      return null;
    }
  })
}

class ForcastTable extends Component {
  handleSort = (e) => {
    const sortBy = e.target.id;
    this.props.setSortedBy(sortBy);
  }
  setMaxChar(str, num) {
    return str.length > num ? str.slice(0, num) + '..' : str;
  }

  render() {
    let forcasts = this.props.forcasts;
    return (
      <table className="forcast-table">
        <thead>
          <tr onClick={this.handleSort}>
            <th id="cityName">city</th>
            <th id="iconPoints">icon</th>
            <th id="averageMaxTemp">avg max</th>
            <th id="averageApparentTemperatureMaxMin">avg</th>
            <th id="humidity">humidity</th>
            <th id="sunlightHours">daylight</th>
          </tr>
        </thead>
        {forcasts.map(forcast => (
          <tbody 
            onClick={this.props.setSingleForcast.bind(this, forcast)}
            key={forcast.cityName}>
            <tr className={'spacing'}></tr>
            <tr>
              <td>{this.setMaxChar(forcast.cityName, 9)}</td>
              <td>
                <ul>
                  {WeatherIconListItem(forcast.allIcons)}
                </ul>
              </td>
              <td>{forcast.averageMaxTemp}</td>
              <td>{Math.round(forcast.averageApparentTemperatureMaxMin)}</td>
              <td>{Math.round(forcast.humidity * 100)}</td>
              <td>{forcast.sunlightHours}</td>
            </tr>
          </tbody>
        ))}
      </table>
    )
  }
}

const mapStateToProps = state => {
  return {
    forcasts: state.forcasts.filteredForcasts,
    sortedBy: state.forcasts.sortedBy,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSingleForcast: forcast => dispatch(setSingleForcast(forcast)),
    setSortedBy: sortBy => dispatch(setSortedBy(sortBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastTable);
