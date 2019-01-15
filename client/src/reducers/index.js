import { combineReducers } from 'redux';
import forcasts from './forcasts';
import errorMessages from './error_messages';

export default combineReducers({
  forcasts,
  errorMessages
})
