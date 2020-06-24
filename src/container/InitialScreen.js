import { connect } from 'react-redux';
import { createCard } from '../actions';
import InitialScreen from '../components/InitialScreen';

const mapDispatchToProps = dispatch => ({
  createCard: card => {
    dispatch(createCard(card));
  },
});

export default connect(null, mapDispatchToProps)(InitialScreen);
