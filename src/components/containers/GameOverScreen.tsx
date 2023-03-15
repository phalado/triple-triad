import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { changeNpcStreak, removeCardNpc } from '../../slicers/npcsSlicer';
import { addCardExplore, removeCardExplore } from '../../slicers/playerCardSlicer';
import GameOverScreen from '../screens/GameOverScreen';
import { changeCardQueenStreak, removeSpecialCardQueen } from '../../slicers/cardQueenSlicer';
import { changeAchievement } from '../../slicers/achievementsSlice';

const mapStateToProps = (state: StateInterface) => ({
  rules: state.rules,
  playerCards: state.playerCards,
  preLoadedSounds: state.preLoadedSounds,
  gameOptions: state.gameOptions,
  achievements: state.achievements
});

const mapDispatchToProps = (dispatch: any) => ({
  removeCardFromNPC: (
    data: { npc: string, card: number, location: string }
  ) => dispatch(removeCardNpc(data)),
  changeNPCStreak: (
    data: { npc: string, streak: 'win' | 'loose' | 'tie', location: string }
  ) => dispatch(changeNpcStreak(data)),
  addCardToExploreDeck: (cardId: number) => dispatch(addCardExplore(cardId)),
  removeCardFromExploreDeck: (cardId: number) => dispatch(removeCardExplore(cardId)),
  removeSpecialCardQueen: (card: number) => dispatch(removeSpecialCardQueen(card)),
  changeCardQueenStreak: (streak: 'win' | 'loose' | 'tie') => dispatch(changeCardQueenStreak(streak)),
  changeAchievement: (achievement: string) => dispatch(changeAchievement(achievement))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOverScreen);
