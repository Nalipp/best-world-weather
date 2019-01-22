import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCurrentValue } from '../actions';

class FilterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialVal, // move to component did mount
    }
    this.startIncrease = this.startIncrease.bind(this); // make arrow
    this.startDecrease = this.startDecrease.bind(this);
    this.stopIncrement = this.stopIncrement.bind(this);
  }
  startIncrease() {
    this.setState({value: this.state.value + 1}, () => {
      this.props.updateCurrentValue(this.props.name, this.state.value);
    });
    this.incrementId = setInterval(() => {
      this.setState({value: this.state.value + 1}, () => {
        this.props.updateCurrentValue(this.props.name, this.state.value);
      });
    }, 200);
  }
  startDecrease() {
    this.setState({value: this.state.value - 1}, () => {
      this.props.updateCurrentValue(this.props.name, this.state.value);
    });
    this.incrementId = setInterval(() => {
      this.setState({value: this.state.value - 1}, () => {
        this.props.updateCurrentValue(this.props.name, this.state.value);
      });
    }, 200);
  }
  stopIncrement() {
    clearInterval(this.incrementId);
  }
  render() {
    return (
      <div>
        <label>{this.props.name}
          <button 
            onMouseDown={this.startDecrease} 
            onMouseUp={this.stopIncrement} 
            type="button">-</button>
          <input type="hidden" value={this.state.value}/>
          <span>{this.state.value}</span>
          <button 
            onMouseDown={this.startIncrease} 
            onMouseUp={this.stopIncrement} 
            type="button">+</button>
        </label>
      </div>
    )
  }
}

FilterInput.propTypes = {
  name: PropTypes.string,
  initialVal: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    forcastState: state.forcasts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentValue: (name, val) => dispatch(updateCurrentValue(name, val)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterInput);

