import { connect } from 'react-redux';

import ExploreScenes from '../screens/ExploreScenes';

import { createCard, resetCards } from '../../slicers/cardsSlicer';
import { changeEvent } from '../../slicers/eventsSlicer';
import { createNpcList } from '../../slicers/npcsSlicer';
import { addCardExplore } from '../../slicers/playerCardSlicer';
import { resetTable } from '../../slicers/tableSlicer';

import CardInterface from '../../interfaces/CardInterface';
import StateInterface from '../../interfaces/StateInterface';

const mapStateToProps = (state: StateInterface) => ({
  table: state.table,
  npcs: state.npcs,
  events: state.events,
  rules: state.rules,
  playerCards: state.playerCards,
});

const mapDispatchToProps = (dispatch: any) => ({
  addCardToExploreDeck: (card: number) => dispatch(addCardExplore(card)),
  createNPCList: () => dispatch(createNpcList()),
  resetTable: () => dispatch(resetTable()),
  changeEvent: (event: string) => dispatch(changeEvent(event)),
  createCard: (player: boolean, card: CardInterface) => dispatch(createCard({ player, card })),
  resetCards: () => dispatch(resetCards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScenes);
