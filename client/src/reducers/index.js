import { combineReducers } from 'redux';
import forcasts from './forcasts';
import maps from './maps';
import userInterface from './userInterface';
import flights from './flights';

export default combineReducers({
  forcasts,
  maps,
  flights,
  userInterface,
})
