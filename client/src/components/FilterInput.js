import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applyFilter } from '../actions';

class FilterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialVal,
      name: this.props.name,
      areFiltered: this.props.forcastsAreFiltered,
    }
    this.startIncrease = this.startIncrease.bind(this);
    this.startDecrease = this.startDecrease.bind(this);
    this.stopIncrement = this.stopIncrement.bind(this);
  }
  startIncrease() {
    this.setState({value: this.state.value + 1}, () => {
      this.props.applyFilter(this.props.forcastState, this.state.value, this.props.name);
    });
    this.incrementId = setInterval(() => {
      this.setState({value: this.state.value + 1}, () => {
        this.props.applyFilter(this.props.forcastState, this.state.value, this.props.name);
      });
    }, 200);
  }
  startDecrease() {
    this.setState({value: this.state.value - 1}, () => {
      this.props.applyFilter(this.props.forcastState, this.state.value, this.props.name);
    });
    this.incrementId = setInterval(() => {
      this.setState({value: this.state.value - 1}, () => {
        this.props.applyFilter(this.props.forcastState, this.state.value, this.props.name);
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
    applyFilter: (val, name) => dispatch(applyFilter(val, name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterInput);

