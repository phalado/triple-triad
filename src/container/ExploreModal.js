import { connect } from 'react-redux';
import ExploreModal from '../components/ExploreModal';
import { addCardToExploreDeck, removeCardFromExploreDeck, resetPlayerDeckExplore } from '../actions';

const mapStateToProps = state => ({
  playerCards: state.playerCards,
});

const mapDispatchToProps = dispatch => ({
  addCardToExploreDeck: card => dispatch(addCardToExploreDeck(card)),
  removeCardFromExploreDeck: card => dispatch(removeCardFromExploreDeck(card)),
  resetPlayerDeckExplore: () => dispatch(resetPlayerDeckExplore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreModal);
