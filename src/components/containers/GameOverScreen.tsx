import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { addCardNpc, addNpcToLocation, changeNpcStreak, removeCardNpc } from '../../slicers/npcsSlicer';
import { addCardExplore, removeCardExplore } from '../../slicers/playerCardSlicer';
import { changeEvent } from '../../slicers/eventsSlicer';
import GameOverScreen from '../screens/GameOverScreen';
import { addSpecialCardQueen, changeCardQueenPlace, changeCardQueenStreak, removeSpecialCardQueen } from '../../slicers/cardQueenSlicer';
import { NpcInterface } from '../../interfaces/NpcsInterface';

const mapStateToProps = (state: StateInterface) => ({
  rules: state.rules,
  playerCards: state.playerCards,
  events: state.events,
  npcs: state.npcs,
  preLoadedSounds: state.preLoadedSounds,
  gameOptions: state.gameOptions
});

const mapDispatchToProps = (dispatch: any) => ({
  addCardToNPC: (
    data: { npc: string, card: number, location: string }
  ) => dispatch(addCardNpc(data)),
  removeCardFromNPC: (
    data: { npc: string, card: number, location: string }
  ) => dispatch(removeCardNpc(data)),
  changeNPCStreak: (
    data: { npc: string, streak: 'win' | 'loose' | 'tie', location: string }
  ) => dispatch(changeNpcStreak(data)),
  addCardToExploreDeck: (cardId: number) => dispatch(addCardExplore(cardId)),
  removeCardFromExploreDeck: (cardId: number) => dispatch(removeCardExplore(cardId)),
  changeEvent: (event: string) => dispatch(changeEvent(event)),
  changeCardQueenPlace: (place: string) => dispatch(changeCardQueenPlace(place)),
  addSpecialCardQueen: (card: number) => dispatch(addSpecialCardQueen(card)),
  removeSpecialCardQueen: (card: number) => dispatch(removeSpecialCardQueen(card)),
  changeCardQueenStreak: (streak: 'win' | 'loose' | 'tie') => dispatch(changeCardQueenStreak(streak)),
  addNpcToLocation: (
    data: { npc: NpcInterface, location: string }
  ) => dispatch(addNpcToLocation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOverScreen);
