import { connect } from 'react-redux';
import ChooseRules from '../components/ChooseRules';
import { changeRules } from '../actions';

const mapStateToProps = state => ({
  rules: state.rules,
});

const mapDispatchToProps = dispatch => ({
  changeRules: rules => dispatch(changeRules(rules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRules);
