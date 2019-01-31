import React, { Component } from 'react';
import Heading from './Heading';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';
import Footer from './Footer';
import CityDetail from './CityDetail';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={'app'}>
        <Heading />

        <div className={'main'}>
          <div className={'list'}>
            <ForcastFilter />
            <Search />
            <ForcastList />
          </div>
          <div className={'detail'}>
            <CityDetail />
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default App;
