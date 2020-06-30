import { connect } from 'react-redux';
import {
  createCard, resetCards, resetTable,
} from '../actions';
import ModalScreen from '../components/ModalScreen';

const mapStateToProps = state => ({
  cards: state.cards,
  table: state.table,
  rules: state.rules,
});

const mapDispatchToProps = dispatch => ({
  createCard: data => {
    dispatch(createCard(data));
  },
  resetCards: () => {
    dispatch(resetCards());
  },
  resetTable: () => {
    dispatch(resetTable());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
