import React, { Component } from 'react';
import Heading from './Heading';
import ForcastFilter from './ForcastFilter';
import ForcastList from './ForcastList';
import Footer from './Footer';
import SelectedCity from './SelectedCity';
import Search from './Search';
import Loader from './Loader';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={'app'}>
        <Loader />
        <Heading />
          <div style={{display: 'flex'}}>
            <div style={{flexGrow: '3'}}>
              <ForcastFilter />
              <Search searchType={'getForcast'} />
              <ForcastList />
            </div>
            <div style={{flexGrow: '4'}}>
              <SelectedCity />
            </div>
          </div>
        <Footer />
      </div>
    )
  }
}

export default App;
