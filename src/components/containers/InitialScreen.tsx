import { connect } from 'react-redux';
import InitialScreen from '../screens/InitialScreen';

import CardInterface from '../../interfaces/CardInterface';
import StateInterface from '../../interfaces/StateInterface';

import { createCard } from '../../slicers/cardsSlicer';
import { restartEvents } from '../../slicers/eventsSlicer';
import { resetCardExplore } from '../../slicers/playerCardSlicer';
import { resetTable } from '../../slicers/tableSlicer';

const mapStateToProps = (state: StateInterface) => ({
  cards: state.cards,
  decks: state.decks,
});

const mapDispatchToProps = (dispatch: any) => ({
  createCard: (player: boolean, card: CardInterface) => dispatch(createCard({ player, card })),
  resetTable: () => dispatch(resetTable()),
  resetPlayerDeckExplore: () => dispatch(resetCardExplore()),
  restartEvents: () => dispatch(restartEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
