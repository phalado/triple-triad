import { combineReducers } from 'redux';
import cards from './cards';
import table from './table';
import rules from './rules';
import decks from './decks';
import playerCards from './playerCards';
import streak from './streak';
import npcs from './npcs';
import events from './events';

const rootReducer = combineReducers({
  cards,
  table,
  rules,
  decks,
  playerCards,
  streak,
  npcs,
  events,
});

export default rootReducer;
