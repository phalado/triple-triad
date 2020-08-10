import { connect } from 'react-redux';
import {
  createCard, resetTable, resetPlayerDeckExplore, restartEvents,
} from '../actions';
import InitialScreen from '../components/InitialScreen';

const mapStateToProps = state => ({
  cards: state.cards,
  decks: state.decks,
});

const mapDispatchToProps = dispatch => ({
  createCard: card => dispatch(createCard(card)),
  resetTable: () => dispatch(resetTable()),
  resetPlayerDeckExplore: () => dispatch(resetPlayerDeckExplore()),
  restartEvents: () => dispatch(restartEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
