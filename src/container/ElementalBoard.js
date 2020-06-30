import { connect } from 'react-redux';
import ElementalBoard from '../components/ElementalBoard';
import { modifyTable } from '../actions';

const mapStateToProps = state => ({
  table: state.table,
  rules: state.rules,
});

const mapDispatchToProps = dispatch => ({
  modifyTable: table => {
    dispatch(modifyTable(table));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ElementalBoard);
