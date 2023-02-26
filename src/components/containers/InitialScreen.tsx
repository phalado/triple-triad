import { connect } from 'react-redux';
import InitialScreen from '../screens/InitialScreen';

import StateInterface from '../../interfaces/StateInterface';
import { LocalRulesInterface } from '../../interfaces/RulesInterface';

import { changeEvent, restartEvents } from '../../slicers/eventsSlicer';
import { resetCardExplore } from '../../slicers/playerCardSlicer';
import { loadSound } from '../../slicers/preLoadedSoundsSlicer';
import { changeRandomRules } from '../../slicers/rulesSlicer';

const mapStateToProps = (state: StateInterface) => ({
  events: state.events,
  rules: state.rules
});

const mapDispatchToProps = (dispatch: any) => ({
  resetPlayerDeckExplore: () => dispatch(resetCardExplore()),
  restartEvents: () => dispatch(restartEvents()),
  loadSound: (name: string, sound: any) => dispatch(loadSound({ name, sound })),
  changeEvent: (event: string) => dispatch(changeEvent(event)),
  changeRandomRules: (rules: LocalRulesInterface) => dispatch(changeRandomRules(rules))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
