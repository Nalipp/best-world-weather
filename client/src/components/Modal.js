import React, { Component } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import { hideLocationDetail } from '../actions';
import { connect } from 'react-redux';

class Modal extends Component {
  render() {
    const displayStatus = this.props.locationDetailOn ? 'display-on' : 'display-off';
    return (
      <div 
        className={`modal ${displayStatus}`}
        onClick={this.props.hideLocationDetail}>
      </div>
    )
  }
}

Modal.propTypes = {
  locationDetailOn: PropTypes.bool,
}

const mapDispatchToProps = dispatch => {
  return {
    hideLocationDetail: () => dispatch(hideLocationDetail()),
  }
}

export default connect(null, mapDispatchToProps)(Modal);
