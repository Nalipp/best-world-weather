import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ForcastTable.css';

class ForcastTable extends Component {
  handleSort = (e) => {
    console.log('handleing sort', e.target.id);
  }
  render() {
    const { forcasts } = this.props;
    return (
      <table className="forcast-table">
        <thead>
          <tr onClick={this.handleSort}>
            <th id="city">city</th>
            <th id="summary">summray</th>
            <th id="temperature">temperature</th>
            <th id="wind_speed">wind speed</th>
            <th id="cloud_cover">cloud cover</th>
          </tr>
        </thead>
        {forcasts.map(forcast => (
          <tbody key={forcast.cityName}>
            <tr>
              <td>{forcast.cityName}</td>
              <td>{forcast.summary}</td>
              <td>{forcast.temperature}</td>
              <td>{forcast.windSpeed}</td>
              <td>{forcast.cloudCover}</td>
            </tr>
          </tbody>
        ))}
      </table>
    )
  }
}

ForcastTable.propTypes = {
  forcasts: PropTypes.array,
}

export default ForcastTable;
