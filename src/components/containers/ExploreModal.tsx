import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { createNpcList } from '../../slicers/npcsSlicer';
import { addCardExplore, removeCardExplore } from '../../slicers/playerCardSlicer';
import { restartRules } from '../../slicers/rulesSlicer';
import ExploreModal from '../modals/ExploreModal';

const mapStateToProps = (state: StateInterface) => ({
  gameOptions: state.gameOptions
});

const mapDispatchToProps = (dispatch: any) => ({
  addCardToExploreDeck: (card: number) => dispatch(addCardExplore(card)),
  removeCardFromExploreDeck: (card: number) => dispatch(removeCardExplore(card)),
  createNPCList: () => dispatch(createNpcList()),
  restartRules: () => dispatch(restartRules()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreModal);
