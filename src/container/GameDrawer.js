import { connect } from 'react-redux';
import GameDrawer from '../components/GameDrawer';
import { createCard, resetCards, resetTable } from '../actions';

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(GameDrawer);
