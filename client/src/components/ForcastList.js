import React, { Component } from 'react';
import { getForcasts } from '../actions/index';
import { connect } from 'react-redux';
import ForcastTable from './ForcastTable';
import './ForcastList.css';

class ForcastList extends Component {
  componentDidMount() {
    this.props.getForcasts();
  }

  render() {
    let forcasts = this.props.filteredForcasts;

    return (
      <div className={'forcast-list'}>
        <ForcastTable forcasts={forcasts} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredForcasts: state.forcasts.filteredForcasts,
    forcastsAreFiltered: state.forcasts.forcastsAreFiltered,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForcasts: () => dispatch(getForcasts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastList);
