import { connect } from 'react-redux';
import GameDeck from '../components/GameDeck';
import { changeDeck } from '../actions';

const mapStateToProps = state => ({
  table: state.table,
  decks: state.decks,
});

const mapDispatchToProps = dispatch => ({
  changeDeck: rules => dispatch(changeDeck(rules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDeck);
