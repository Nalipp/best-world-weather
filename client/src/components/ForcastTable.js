import React, { Component } from 'react';
import './ForcastTable.css';
import { connect } from 'react-redux';
import { setSortedBy } from '../actions';

class ForcastTable extends Component {
  handleSort = (e) => {
    const sortBy = e.target.id;
    this.props.setSortedBy(sortBy);
  }

  render() {
    let forcasts = this.props.forcasts;
    return (
      <table className="forcast-table">
        <thead>
          <tr onClick={this.handleSort}>
            <th id="cityName">city</th>
            <th id="summary">summray</th>
            <th id="temperature">temperature</th>
            {/* <th id="windSpeed">wind speed</th> */}
            {/* <th id="cloudCover">cloud cover</th> */}
          </tr>
        </thead>
        {forcasts.map(forcast => (
          <tbody key={forcast.cityName}>
            <tr>
              <td>{forcast.cityName}</td>
              <td>{forcast.summary}</td>
              <td>{forcast.temperature}</td>
              {/* <td>{forcast.windSpeed}</td> */}
              {/* <td>{Math.floor(forcast.cloudCover)}</td> */}
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
    setSortedBy: (sortBy) => dispatch(setSortedBy(sortBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastTable);
