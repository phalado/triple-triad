import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { modifyTable } from '../../slicers/tableSlicer';
import ElementalBoard from '../ElementalBoard';

const mapStateToProps = (state: StateInterface) => ({
  table: state.table,
});

const mapDispatchToProps = (dispatch: any) => ({
  modifyTable: (table: any) => dispatch(modifyTable(table)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ElementalBoard);
