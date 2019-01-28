import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './FilterInput.css';
import { 
  updateCurrentValue,
  applyCurrentFilter,
  removeCurrentFilter,
  showInputFilter,
  hideInputFilter 
} from '../actions';

class FilterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      incrementId: null,
      currentCount: 0,
    }
  }
  componentDidMount() {
    this.setState({ value: this.props.currentValue });
  }
  hide = () => {
    this.props.hideInputFilter(this.props.name);
    this.props.removeCurrentFilter(this.props.name);
  }
  show = () => {
    this.props.showInputFilter(this.props.name);
    this.props.applyCurrentFilter(this.props.name);
  }
  startIncrease = () => {
    this.show();
    this.setState({ value: this.state.value + 1}, () => {
      this.props.updateCurrentValue(this.props.name, this.state.value);
    });
    this.setState({ incrementId: setInterval(() => {
      this.setState({ value: this.state.value + 1, currentCount: this.state.currentCount + 1}, () => {
        this.props.updateCurrentValue(this.props.name, this.state.value);
        if (this.state.currentCount > 2) {
          this.stopIncrement();
          this.setState({ currentCount: 0 }, () => {
            this.setState({ incrementId: setInterval(() => {
              this.setState({ value: this.state.value + 1 }, () => {
                this.props.updateCurrentValue(this.props.name, this.state.value);
              });
            }, 80) });
          });
        }
      });
    }, 160) });
  }
  startDecrease = () => {
    this.show();
    this.setState({ value: this.state.value - 1}, () => {
      this.props.updateCurrentValue(this.props.name, this.state.value);
    });
    this.setState({ incrementId: setInterval(() => {
      this.setState({value: this.state.value - 1, currentCount: this.state.currentCount + 1}, () => {
        this.props.updateCurrentValue(this.props.name, this.state.value);
        if (this.state.currentCount > 2) {
          this.stopIncrement();
          this.setState({ currentCount: 0 }, () => {
            this.setState({ incrementId: setInterval(() => {
              this.setState({ value: this.state.value - 1 }, () => {
                this.props.updateCurrentValue(this.props.name, this.state.value);
              });
            }, 80) });
          });
        }
      });
    }, 160) });
  }
  stopIncrement = () => {
    this.setState({ incrementId: clearInterval(this.state.incrementId) });
  }
  render() {
    return (
      <div className={'filter-input'} 
           style={!this.props.isShowing ? {color: '#bbb'} : null}>
        {this.props.isShowing 
          ?
          <button onClick={this.hide} type="button">X</button>
          :
          <button onClick={this.show} type="button">O</button>}
        <label>{this.props.name}
          <button 
            onMouseDown={this.startDecrease} 
            onMouseUp={this.stopIncrement} 
            type="button">-</button>
          <input type="hidden" value={this.state.value}/>
          <span>{this.props.currentValue}</span>
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
}

const mapStateToProps = (state, props) => {
  return {
    isShowing: state.forcasts.isShowing[props.name],
    forcastState: state.forcasts,
    currentValue: state.forcasts.currentValues[props.name],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentValue: (name, val) => dispatch(updateCurrentValue(name, val)),
    applyCurrentFilter: filterName => dispatch(applyCurrentFilter(filterName)),
    removeCurrentFilter: filterName => dispatch(removeCurrentFilter(filterName)),
    showInputFilter: filterName => dispatch(showInputFilter(filterName)),
    hideInputFilter: filterName => dispatch(hideInputFilter(filterName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterInput);

