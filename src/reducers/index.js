import { combineReducers } from 'redux';
import cards from './cards';
import table from './table';
import rules from './rules';
import decks from './decks';
import playerCards from './playerCards';
import streak from './streak';
import npcs from './npcs';

const rootReducer = combineReducers({
  cards,
  table,
  rules,
  decks,
  playerCards,
  streak,
  npcs,
});

export default rootReducer;
