import React, { Component } from 'react';
import './ForcastTable.css';
import { connect } from 'react-redux';
import { setSortedBy, setLocationDetail, showLocationDetail } from '../actions';
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
    this.props.setLocationDetail(forcast, forcast.cityName);
    this.props.showLocationDetail();
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
            <th id="humidity">humid</th>
            <th id="sunlightHours">sunlight</th>
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
    singleForcast: state.forcasts.singleForcast,
    forcasts: state.forcasts.filteredForcasts,
    sortedBy: state.forcasts.sortedBy,
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
