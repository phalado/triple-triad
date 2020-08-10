import { connect } from 'react-redux';
import ChooseCardsScreen from '../components/ChooseCardsScreen';
import {
  changeDeck, startDeck, createCard, resetCards,
} from '../actions';

const mapStateToProps = state => ({
  table: state.table,
  decks: state.decks,
  playerCards: state.playerCards,
});

const mapDispatchToProps = dispatch => ({
  changeDeck: rules => dispatch(changeDeck(rules)),
  startDeck: () => dispatch(startDeck()),
  createCard: data => dispatch(createCard(data)),
  resetCards: data => dispatch(resetCards(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCardsScreen);
