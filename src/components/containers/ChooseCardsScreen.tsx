import { connect } from 'react-redux';
import CardInterface from '../../interfaces/CardInterface';
import StateInterface from '../../interfaces/StateInterface';
import { createCard, resetCards } from '../../slicers/cardsSlicer';
import { changeDeck, startDecks } from '../../slicers/decksSlicer';
import ChooseCardsScreen from '../screens/ChooseCardsScreen';

const mapStateToProps = (state: StateInterface) => ({
  table: state.table,
  decks: state.decks,
  playerCards: state.playerCards,
});

const mapDispatchToProps = (dispatch: any) => ({
  changeDeck: (data: {
    player: boolean, deck: string, cards: number[]
  }) => dispatch(changeDeck(data)),
  startDeck: () => dispatch(startDecks()),
  createCard: (player: boolean, card: CardInterface) => dispatch(createCard({ player, card })),
  resetCards: () => dispatch(resetCards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCardsScreen);
