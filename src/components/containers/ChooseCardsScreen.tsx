import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { changeDeck, changeSelectedDeck } from '../../slicers/decksSlicer';
import ChooseCardsScreen from '../screens/ChooseCardsScreen';

const mapStateToProps = (state: StateInterface) => ({
  playerCards: state.playerCards,
  gameOptions: state.gameOptions,
  decks: state.decks
});

const mapDispatchToProps = (dispatch: any) => ({
  changeDeck: (data: { deck: string, cards: number[] }) => dispatch(changeDeck(data)),
  changeSelectedDeck: (deck: string) => dispatch(changeSelectedDeck(deck))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCardsScreen);
