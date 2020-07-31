import { connect } from 'react-redux';
import ExploreScenes from '../components/ExploreScenes';
import {
  addCardToExploreDeck, removeCardFromExploreDeck, createNPCList, resetTable, changeEvent,
} from '../actions';

const mapStateToProps = state => ({
  playerCards: state.playerCards,
  table: state.table,
  npcs: state.npcs,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  addCardToExploreDeck: card => dispatch(addCardToExploreDeck(card)),
  removeCardFromExploreDeck: card => dispatch(removeCardFromExploreDeck(card)),
  createNPCList: () => dispatch(createNPCList()),
  resetTable: () => dispatch(resetTable()),
  changeEvent: event => dispatch(changeEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScenes);
