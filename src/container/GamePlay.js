import { connect } from 'react-redux';
import GamePlay from '../components/GamePlay';
import {
  modifyTable, createCard, removeCard, resetCards, resetTable,
} from '../actions';

const mapStateToProps = state => ({
  cards: state.cards,
  table: state.table,
  rules: state.rules,
  npcs: state.npcs,
});

const mapDispatchToProps = dispatch => ({
  modifyTable: table => dispatch(modifyTable(table)),
  resetTable: () => dispatch(resetTable()),
  createCard: data => dispatch(createCard(data)),
  removeCard: data => dispatch(removeCard(data)),
  resetCards: () => dispatch(resetCards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
