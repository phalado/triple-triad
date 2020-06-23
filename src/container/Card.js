import { connect } from 'react-redux';
import { changeTurn } from '../actions';
import Card from '../components/Card';

const mapStateToProps = state => ({
  turn: state.turn,
});

const mapDispatchToProps = dispatch => ({
  changeTurn: turn => {
    dispatch(changeTurn(turn));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
