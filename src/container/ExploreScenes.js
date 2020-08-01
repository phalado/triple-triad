import { connect } from 'react-redux';
import ExploreScenes from '../components/ExploreScenes';
import {
  addCardToExploreDeck, removeCardFromExploreDeck, createNPCList,
  resetTable, changeEvent, createCard, resetCards,
} from '../actions';

const mapStateToProps = state => ({
  table: state.table,
  npcs: state.npcs,
  events: state.events,
  rules: state.rules,
  playerCards: state.playerCards,
});

const mapDispatchToProps = dispatch => ({
  addCardToExploreDeck: card => dispatch(addCardToExploreDeck(card)),
  removeCardFromExploreDeck: card => dispatch(removeCardFromExploreDeck(card)),
  createNPCList: () => dispatch(createNPCList()),
  resetTable: () => dispatch(resetTable()),
  changeEvent: event => dispatch(changeEvent(event)),
  createCard: data => dispatch(createCard(data)),
  resetCards: data => dispatch(resetCards(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScenes);
