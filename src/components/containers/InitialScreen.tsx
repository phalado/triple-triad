import { connect } from 'react-redux';
import InitialScreen from '../screens/InitialScreen';

import StateInterface from '../../interfaces/StateInterface';

import { changeEvent, restartEvents } from '../../slicers/eventsSlicer';
import { resetCardExplore } from '../../slicers/playerCardSlicer';
import { loadSound } from '../../slicers/preLoadedSoundsSlicer';

const mapStateToProps = (state: StateInterface) => ({
  events: state.events
});

const mapDispatchToProps = (dispatch: any) => ({
  resetPlayerDeckExplore: () => dispatch(resetCardExplore()),
  restartEvents: () => dispatch(restartEvents()),
  loadSound: (name: string, sound: any) => dispatch(loadSound({ name, sound })),
  changeEvent: (event: string) => dispatch(changeEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
