import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import { changeAchievementPopup } from '../../slicers/achievementsSlice';
import ToastMessage from '../ToastMessage';

const mapStateToProps = (state: StateInterface) => ({
  gameOptions: state.gameOptions,
  achievements: state.achievements
});

const mapDispatchToProps = (dispatch: any) => ({
  changeAchievementPopup: (achievement:string) => dispatch(changeAchievementPopup(achievement)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage);
