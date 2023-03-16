import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { startDecks } from '../../slicers/decksSlicer';
import { createNpcList } from '../../slicers/npcsSlicer';
import { addCardExplore, removeCardExplore } from '../../slicers/playerCardSlicer';
import { restartRules } from '../../slicers/rulesSlicer';
import ExploreInitialScreen from '../screens/ExploreInitialScreen';

const mapStateToProps = (state: StateInterface) => ({
  gameOptions: state.gameOptions,
  events: state.events
});

const mapDispatchToProps = (dispatch: any) => ({
  addCardToExploreDeck: (card: number) => dispatch(addCardExplore(card)),
  removeCardFromExploreDeck: (card: number) => dispatch(removeCardExplore(card)),
  createNPCList: () => dispatch(createNpcList()),
  restartRules: () => dispatch(restartRules()),
  startDecks: () => dispatch(startDecks())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreInitialScreen);
