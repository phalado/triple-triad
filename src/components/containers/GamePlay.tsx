import { connect } from 'react-redux';
import CardInterface from '../../interfaces/CardInterface';
import StateInterface from '../../interfaces/StateInterface';
import TableInterface from '../../interfaces/TableInterface';
import { createCard, removeCard, resetCards } from '../../slicers/cardsSlicer';
import { modifyTable, resetTable } from '../../slicers/tableSlicer';
import GamePlayScreen from '../screens/GamePlayScreen';

const mapStateToProps = (state: StateInterface) => ({
  cards: state.cards,
  table: state.table,
  rules: state.rules,
  npcs: state.npcs,
});

const mapDispatchToProps = (dispatch: any) => ({
  modifyTable: (table: TableInterface) => dispatch(modifyTable(table)),
  resetTable: () => dispatch(resetTable()),
  createCard: (player: boolean, card: CardInterface) => dispatch(createCard({ player, card })),
  removeCard: (
    player: boolean, row: number, column: number
  ) => dispatch(removeCard({ player, row, column })),
  resetCards: () => dispatch(resetCards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayScreen);
