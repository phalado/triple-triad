import { connect } from 'react-redux';

import ExploreScenes from '../screens/ExploreScenes';

import { changeEvent } from '../../slicers/eventsSlicer';
import { createNpcList } from '../../slicers/npcsSlicer';
import { addCardExplore } from '../../slicers/playerCardSlicer';

import StateInterface from '../../interfaces/StateInterface';

const mapStateToProps = (state: StateInterface) => ({
  npcs: state.npcs,
  events: state.events,
  rules: state.rules,
  playerCards: state.playerCards,
  cardQueen: state.cardQueen
});

const mapDispatchToProps = (dispatch: any) => ({
  addCardToExploreDeck: (card: number) => dispatch(addCardExplore(card)),
  createNPCList: () => dispatch(createNpcList()),
  changeEvent: (event: string) => dispatch(changeEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScenes);
