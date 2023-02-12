import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import GamePlayScreen from '../screens/GamePlayScreen';

const mapStateToProps = (state: StateInterface) => ({
  rules: state.rules,
  npcs: state.npcs,
  preLoadedSounds: state.preLoadedSounds
});

// const mapDispatchToProps = (dispatch: any) => ({
// });

export default connect(mapStateToProps, null)(GamePlayScreen);
