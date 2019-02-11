import React, { Component } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import { hideLocationDetail } from '../actions';
import { connect } from 'react-redux';

class Modal extends Component {
  render() {
    const displayStatus = this.props.isActive ? 'display-on' : 'display-off';
    return (
      <div 
        className={`modal ${displayStatus}`}
        onClick={this.props.hideLocationDetail}>
      </div>
    )
  }
}

Modal.propTypes = {
  isActive: PropTypes.bool,
}

const mapDispatchToProps = dispatch => {
  return {
    hideLocationDetail: () => dispatch(hideLocationDetail()),
  }
}

export default connect(null, mapDispatchToProps)(Modal);
