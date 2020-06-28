import { combineReducers } from 'redux';
import cards from './cards';
import table from './table';

const rootReducer = combineReducers({
  cards,
  table,
});

export default rootReducer;
