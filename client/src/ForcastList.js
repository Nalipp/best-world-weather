import React, { Component } from 'react';
import * as apiCalls from './api';

const CityTable = ({ forcasts }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>city</th>
          <th>summray</th>
          <th>temperature</th>
          <th>wind speed</th>
          <th>cloud cover</th>
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

class ForcastList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forcasts: []
    }
  }

  componentWillMount() {
    this.loadForcasts();
  }

  async loadForcasts() {
    let forcasts = await apiCalls.getForcasts();
    console.log('got forcasts!!!!!', forcasts);
    this.setState({ forcasts: forcasts });
  }
  render() {
    return (
      <div>
        <h1>Best City Weather</h1>
        <CityTable forcasts={this.state.forcasts} />
      </div>
    );
  }
}

export default ForcastList;
