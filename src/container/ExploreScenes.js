import { connect } from 'react-redux';
import ExploreScenes from '../components/ExploreScenes';
import {
  addCardToExploreDeck, removeCardFromExploreDeck, createNPCList,
} from '../actions';

const mapStateToProps = state => ({
  playerCards: state.playerCards,
  table: state.table,
  npcs: state.npcs,
});

const mapDispatchToProps = dispatch => ({
  addCardToExploreDeck: card => dispatch(addCardToExploreDeck(card)),
  removeCardFromExploreDeck: card => dispatch(removeCardFromExploreDeck(card)),
  createNPCList: () => dispatch(createNPCList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScenes);
