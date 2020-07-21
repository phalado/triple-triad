import { connect } from 'react-redux';
import {
  createCard, resetCards, resetTable,
  addCardToNPC, removeCardFromNPC, addCardToExploreDeck, removeCardFromExploreDeck,
  changeNPCStreak, changeCardQueenLocation,
} from '../actions';
import GameOverScreen from '../components/GameOverScreen';

const mapStateToProps = state => ({
  cards: state.cards,
  table: state.table,
  rules: state.rules,
  playerCards: state.playerCards,
});

const mapDispatchToProps = dispatch => ({
  createCard: data => dispatch(createCard(data)),
  resetCards: () => dispatch(resetCards()),
  resetTable: () => dispatch(resetTable()),
  addCardToNPC: data => dispatch(addCardToNPC(data)),
  removeCardFromNPC: data => dispatch(removeCardFromNPC(data)),
  addCardToExploreDeck: cardId => dispatch(addCardToExploreDeck(cardId)),
  removeCardFromExploreDeck: cardId => dispatch(removeCardFromExploreDeck(cardId)),
  changeNPCStreak: data => dispatch(changeNPCStreak(data)),
  changeCardQueenLocation: location => dispatch(changeCardQueenLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOverScreen);
