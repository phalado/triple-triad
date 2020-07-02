import { connect } from 'react-redux';
import { createCard } from '../actions';
import InitialScreen from '../components/InitialScreen';

const mapStateToProps = state => ({
  decks: state.decks,
});

const mapDispatchToProps = dispatch => ({
  createCard: card => {
    dispatch(createCard(card));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
