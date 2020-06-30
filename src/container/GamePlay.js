import { connect } from 'react-redux';
import GamePlay from '../components/GamePlay';
import { modifyTable, createCard, removeCard } from '../actions';

const mapStateToProps = state => ({
  cards: state.cards,
  table: state.table,
  rules: state.rules,
});

const mapDispatchToProps = dispatch => ({
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
