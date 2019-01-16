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
    let filtered = this.props.filteredForcasts;
    let all = this.props.allForcasts;
    let forcasts = this.props.forcastsAreFiltered ? filtered : all;
    return (
      <div className={'forcast-list'}>
        <ForcastTable forcasts={forcasts} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('ForcastList state...', state.forcasts);
  return {
    filteredForcasts: state.forcasts.filteredForcasts,
    allForcasts: state.forcasts.allForcasts,
    forcastsAreFiltered: state.forcasts.forcastsAreFiltered,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForcasts: () => dispatch(getForcasts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastList);
