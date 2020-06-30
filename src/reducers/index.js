import { combineReducers } from 'redux';
import cards from './cards';
import table from './table';
import rules from './rules';

const rootReducer = combineReducers({
  cards,
  table,
  rules,
});

export default rootReducer;
