import { connect } from 'react-redux';
import GameDeck from '../components/GameDeck';

const mapStateToProps = state => ({
  table: state.table,
});

export default connect(mapStateToProps, null)(GameDeck);
