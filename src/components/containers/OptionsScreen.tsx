import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { changeGameLanguage, changeUsername } from '../../slicers/gameOptions';
import OptionsScreen from '../screens/OptionsScreen';

const mapStateToProps = (state: StateInterface) => ({
  gameOptions: state.gameOptions,
});

const mapDispatchToProps = (dispatch: any) => ({
  changeUsername: (username: string) => dispatch(changeUsername(username)),
  changeGameLanguage: (language: 'eng' | 'ptbr') => dispatch(changeGameLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsScreen);
