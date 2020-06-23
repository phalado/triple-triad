import { connect } from 'react-redux';
import { createCard, createTurn } from '../actions';
import InitialScreen from '../components/InitialScreen';

const mapDispatchToProps = dispatch => ({
  createCard: card => {
    dispatch(createCard(card));
  },
  createTurn: turn => {
    dispatch(createTurn(turn));
  },
});

export default connect(null, mapDispatchToProps)(InitialScreen);
