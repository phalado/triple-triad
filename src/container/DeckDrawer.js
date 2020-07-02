import { connect } from 'react-redux';
import DeckDrawer from '../components/DeckDrawer';

const mapStateToProps = state => ({
  decks: state.decks,
});

export default connect(mapStateToProps, null)(DeckDrawer);
