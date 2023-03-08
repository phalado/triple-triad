import { connect } from 'react-redux';

import ExploreScenes from '../screens/ExploreScenes';

import { changeEvent } from '../../slicers/eventsSlicer';
import { createNpcList } from '../../slicers/npcsSlicer';
import { addCardExplore } from '../../slicers/playerCardSlicer';
import { changeLastLocation } from '../../slicers/gameOptions';
import { changeAchievement } from '../../slicers/achievementsSlice';

import StateInterface from '../../interfaces/StateInterface';

const mapStateToProps = (state: StateInterface) => ({
  npcs: state.npcs,
  events: state.events,
  rules: state.rules,
  playerCards: state.playerCards,
  cardQueen: state.cardQueen,
  gameOptions: state.gameOptions,
  achievements: state.achievements
});

const mapDispatchToProps = (dispatch: any) => ({
  addCardToExploreDeck: (card: number) => dispatch(addCardExplore(card)),
  createNPCList: () => dispatch(createNpcList()),
  changeEvent: (event: string) => dispatch(changeEvent(event)),
  changeLastLocation: (location: string) => dispatch(changeLastLocation(location)),
  changeAchievement: (achievement: string) => dispatch(changeAchievement(achievement))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScenes);
