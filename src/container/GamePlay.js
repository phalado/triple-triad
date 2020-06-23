import { connect } from 'react=redux';
import GamePlay from '../components/GamePlay';
import { createTurn } from '../actions';

const mapStateToProps = state => ({
  cards: state.cards,
  table: state.table,
  turn: state.turn,
});

const mapDispatchToProps = dispatch => ({
  createTurn: turn => {
    dispatch(createTurn(turn));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
