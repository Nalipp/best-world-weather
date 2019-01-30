import React, { Component } from 'react';
import './ForcastTable.css';
import { connect } from 'react-redux';
import { setSortedBy } from '../actions';

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
            <th id="summary">summray</th>
            <th id="temperature">temp</th>
            <th id="windSpeed">wind</th>
            <th id="cloudCover">% cloud</th>
          </tr>
        </thead>
        {forcasts.map(forcast => (
          <tbody key={forcast.cityName}>
            <tr className={'spacing'}></tr>
            <tr>
              <td>{this.setMaxChar(forcast.cityName, 9)}</td>
              <td>{this.setMaxChar(forcast.summary, 5)}</td>
              <td>{forcast.temperature}</td>
              <td>{forcast.windSpeed}</td>
              <td>{Math.floor(forcast.cloudCover)}</td>
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
