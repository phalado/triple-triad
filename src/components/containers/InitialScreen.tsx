import { connect } from 'react-redux';
import InitialScreen from '../screens/InitialScreen';

import StateInterface from '../../interfaces/StateInterface';

import { restartEvents } from '../../slicers/eventsSlicer';
import { resetCardExplore } from '../../slicers/playerCardSlicer';
import { loadSound } from '../../slicers/preLoadedSoundsSlicer';

const mapStateToProps = (state: StateInterface) => ({
  // decks: state.decks,
});

const mapDispatchToProps = (dispatch: any) => ({
  resetPlayerDeckExplore: () => dispatch(resetCardExplore()),
  restartEvents: () => dispatch(restartEvents()),
  loadSound: (name: string, sound: any) => dispatch(loadSound({ name, sound }))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
