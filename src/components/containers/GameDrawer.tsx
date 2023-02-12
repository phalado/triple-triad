import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import GameDrawer from '../drawers/GameDrawer';

const mapStateToProps = (state: StateInterface) => ({
  rules: state.rules,
});

// const mapDispatchToProps = (dispatch: any) => ({
// });

export default connect(mapStateToProps, null)(GameDrawer);
