import { connect } from 'react-redux';
import CardInterface from '../../interfaces/CardInterface';
import StateInterface from '../../interfaces/StateInterface';
import { createNpcList } from '../../slicers/npcsSlicer';
import { addCardExplore, removeCardExplore } from '../../slicers/playerCardSlicer';
import { restartRules } from '../../slicers/rulesSlicer';
import ExploreModal from '../modals/ExploreModal';

const mapStateToProps = (state: StateInterface) => ({
  // playerCards: state.playerCards,
  table: state.table,
});

const mapDispatchToProps = (dispatch: any) => ({
  addCardToExploreDeck: (card: number) => dispatch(addCardExplore(card)),
  removeCardFromExploreDeck: (card: number) => dispatch(removeCardExplore(card)),
  createNPCList: () => dispatch(createNpcList()),
  restartRules: () => dispatch(restartRules()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreModal);
