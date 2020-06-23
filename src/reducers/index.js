import { combineReducers } from 'redux';
import cards from './cards';
import table from './table';
import turn from './turn';

const rootReducer = combineReducers({
  cards,
  table,
  turn,
});

export default rootReducer;
