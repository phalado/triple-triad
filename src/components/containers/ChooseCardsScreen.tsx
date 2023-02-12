import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import ChooseCardsScreen from '../screens/ChooseCardsScreen';

const mapStateToProps = (state: StateInterface) => ({
  playerCards: state.playerCards,
});

const mapDispatchToProps = (dispatch: any) => ({
  // changeDeck: (data: {
  //   player: boolean, deck: string, cards: number[]
  // }) => dispatch(changeDeck(data)),
  // startDeck: () => dispatch(startDecks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCardsScreen);
