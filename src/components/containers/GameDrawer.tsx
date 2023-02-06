import { connect } from 'react-redux';
import { createCard, resetCards } from '../../slicers/cardsSlicer';
import { resetTable } from '../../slicers/tableSlicer';
import StateInterface from '../../interfaces/StateInterface';
import CardInterface from '../../interfaces/CardInterface';
import GameDrawer from '../drawers/GameDrawer';

const mapStateToProps = (state: StateInterface) => ({
  rules: state.rules,
});

const mapDispatchToProps = (dispatch: any) => ({
  createCard: (player: boolean, card: CardInterface) => dispatch(createCard({ player, card })),
  resetCards: () => dispatch(resetCards()),
  resetTable: () => dispatch(resetTable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDrawer);
