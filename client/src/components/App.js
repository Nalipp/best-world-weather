import React, { Component } from 'react';
import './App.css';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Best City Weather</h1>
        <ForcastFilter />
        <ForcastList />
      </div>
    )
  }
}

export default App;
