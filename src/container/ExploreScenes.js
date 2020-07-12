import { connect } from 'react-redux';
import ExploreScenes from '../components/ExploreScenes';
import { addCardToExploreDeck, removeCardFromExploreDeck } from '../actions';

const mapStateToProps = state => ({
  playerCards: state.playerCards,
  table: state.table,
});

const mapDispatchToProps = dispatch => ({
  addCardToExploreDeck: card => dispatch(addCardToExploreDeck(card)),
  removeCardFromExploreDeck: card => dispatch(removeCardFromExploreDeck(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScenes);
