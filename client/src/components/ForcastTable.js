import React, { Component } from 'react';
import './ForcastTable.css';
import { connect } from 'react-redux';
import WeatherIconList from './WeatherIconList';
import { setSortedBy,
         setLocationDetail,
         showLocationDetail } from '../actions';

class ForcastTable extends Component {
  handleSort = (e) => {
    const sortBy = e.target.id;
    this.props.setSortedBy(sortBy);
  }
  setMaxChar(str, num) {
    return str.length > num ? str.slice(0, num) + '..' : str;
  }
  handleSetSingleForcast(forcast) {
    this.props.setLocationDetail(forcast, forcast.cityName);
    this.props.showLocationDetail();
  }

  render() {
    let { filteredForcasts } = this.props;

    return (
      <table className="forcast-table">
        <thead>
          <tr onClick={this.handleSort}>
            <th id="cityName">city</th>
            <th id="iconPoints">icon</th>
            <th id="averageMaxTemp">avg max</th>
            <th id="humidity">humid</th>
            <th id="flightCost">flight cost</th>
          </tr>
        </thead>
        {filteredForcasts.map(forcast => (
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
              <td>{Math.round(forcast.humidity * 100)}</td>
              {forcast.flights 
                && forcast.flights.SFO 
                && forcast.flights.SFO.cost !== 'NA' 
                ?
                <td>$ {forcast.flights.SFO.cost}</td>
                :
                <td></td>
              }
            </tr>
          </tbody>
        ))}
      </table>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleForcast: state.forcasts.singleForcast,
    filteredForcasts: state.forcasts.filteredForcasts,
    sortedBy: state.forcasts.sortedBy,
    filteredForcasts: state.forcasts.filteredForcasts,
    currentFlightOrigin: state.flights.currentFlightOrigin,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocationDetail: forcast => dispatch(setLocationDetail(forcast)),
    setSortedBy: sortBy => dispatch(setSortedBy(sortBy)),
    showLocationDetail: () => dispatch(showLocationDetail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastTable);
