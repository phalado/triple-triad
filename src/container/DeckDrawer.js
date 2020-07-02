import { connect } from 'react-redux';
import DeckDrawer from '../components/DeckDrawer';
import { changeDeck } from '../actions';

const mapStateToProps = state => ({
  decks: state.decks,
});

const mapDispatchToProps = dispatch => ({
  changeDeck: rules => {
    dispatch(changeDeck(rules));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDrawer);
