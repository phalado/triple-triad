import { connect } from 'react-redux';
import ExploreModal from '../components/ExploreModal';
import {
  addCardToExploreDeck, removeCardFromExploreDeck, createNPCList, restartRules,
} from '../actions';

const mapStateToProps = state => ({
  playerCards: state.playerCards,
  table: state.table,
});

const mapDispatchToProps = dispatch => ({
  addCardToExploreDeck: card => dispatch(addCardToExploreDeck(card)),
  removeCardFromExploreDeck: card => dispatch(removeCardFromExploreDeck(card)),
  createNPCList: () => dispatch(createNPCList()),
  restartRules: () => dispatch(restartRules()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreModal);
