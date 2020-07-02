import { combineReducers } from 'redux';
import cards from './cards';
import table from './table';
import rules from './rules';
import decks from './decks';

const rootReducer = combineReducers({
  cards,
  table,
  rules,
  decks,
});

export default rootReducer;
