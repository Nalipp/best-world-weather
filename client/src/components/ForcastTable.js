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
            <th id="icon">icon</th>
            <th id="averageMaxTemp">avg max</th>
            <th id="iconPoints">icon points</th>
            <th id="sunlightHours">daylight</th>
          </tr>
        </thead>
        {forcasts.map(forcast => (
          <tbody key={forcast.cityName}>
            <tr className={'spacing'}></tr>
            <tr>
              <td>{this.setMaxChar(forcast.cityName, 9)}</td>
              <td>{this.setMaxChar(forcast.icon, 8)}</td>
              <td>{forcast.averageMaxTemp}</td>
              <td>{forcast.iconPoints}</td>
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
    setSortedBy: (sortBy) => dispatch(setSortedBy(sortBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastTable);
