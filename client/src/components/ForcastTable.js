import React, { Component } from 'react';
import './ForcastTable.css';
import { connect } from 'react-redux';
import { setSortedBy, setSingleForcast, showSingleForcast } from '../actions';
import WeatherIconList from './WeatherIconList';

class ForcastTable extends Component {
  handleSort = (e) => {
    const sortBy = e.target.id;
    this.props.setSortedBy(sortBy);
  }
  setMaxChar(str, num) {
    return str.length > num ? str.slice(0, num) + '..' : str;
  }
  handleSetSingleForcast(forcast) {
    this.props.setSingleForcast(forcast);
    this.props.showSingleForcast();
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
            onClick={this.handleSetSingleForcast.bind(this, forcast)}
            key={forcast.cityName}>
            <tr className={'spacing'}></tr>
            <tr>
              <td>{this.setMaxChar(forcast.cityName, 9)}</td>
              <td>
                <ul>
                  <WeatherIconList allIcons={forcast.allIcons} />
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
    showSingleForcast: () => dispatch(showSingleForcast()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastTable);
