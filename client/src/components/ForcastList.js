import React, { Component } from 'react';
import { getForcasts } from '../actions/index';
import { connect } from 'react-redux';

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
      sortedForcasts: null
    }
  }

  componentDidMount() {
    this.props.getForcasts();
  }

  render() {
    return (
      <div>
        <h1>Best City Weather</h1>
        <CityTable forcasts={this.state.sortedForcasts || this.props.forcasts} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    forcasts: state.forcasts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForcasts: () => dispatch(getForcasts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastList);
