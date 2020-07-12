import { connect } from 'react-redux';
import { createCard, resetTable, resetPlayerDeckExplore } from '../actions';
import InitialScreen from '../components/InitialScreen';

const mapStateToProps = state => ({
  cards: state.cards,
  decks: state.decks,
});

const mapDispatchToProps = dispatch => ({
  createCard: card => dispatch(createCard(card)),
  resetTable: () => dispatch(resetTable()),
  resetPlayerDeckExplore: () => dispatch(resetPlayerDeckExplore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
