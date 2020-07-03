import { connect } from 'react-redux';
import ChooseDecksScreen from '../components/ChooseDeckScreen';
import { createCard, resetCards } from '../actions';

const mapStateToProps = state => ({
  decks: state.decks,
  table: state.table,
});

const mapDispatchToProps = dispatch => ({
  createCard: data => dispatch(createCard(data)),
  resetCards: data => dispatch(resetCards(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDecksScreen);
