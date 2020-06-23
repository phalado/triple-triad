import { connect } from 'react-redux';
import GamePlay from '../components/GamePlay';
import {
  modifyTable, createCard, removeCard, changeTurn,
} from '../actions';

const mapStateToProps = state => ({
  cards: state.cards,
  table: state.table,
  turn: state.turn,
});

const mapDispatchToProps = dispatch => ({
  changeTurn: turn => {
    dispatch(changeTurn(turn));
  },
  modifyTable: table => {
    dispatch(modifyTable(table));
  },
  addCard: data => {
    dispatch(createCard(data));
  },
  removeCard: data => {
    dispatch(removeCard(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
