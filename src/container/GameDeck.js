import { connect } from 'react-redux';
import GameDeck from '../components/GameDeck';
import { changeDeck, startDeck } from '../actions';

const mapStateToProps = state => ({
  table: state.table,
  decks: state.decks,
});

const mapDispatchToProps = dispatch => ({
  changeDeck: rules => dispatch(changeDeck(rules)),
  startDeck: () => dispatch(startDeck()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDeck);
