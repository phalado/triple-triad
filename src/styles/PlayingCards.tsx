import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenWidth, ScreenHeight } = CSSSizes

const PlayingCardsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: ScreenWidth * 0.17,
    height: ScreenHeight * 0.9,
    top: ScreenHeight * 0.02,
  },
  play1: {
    right: ScreenWidth * 0.025,
  },
  play2: {
    left: ScreenWidth * 0.025,
  },
  nameText: {
    fontSize: ScreenWidth * 0.04,
    textAlign: 'center',
  },
  scoreText: {
    position: 'absolute',
    bottom: -ScreenHeight * 0.04,
    left: ScreenWidth * 0.01,
    fontSize: ScreenWidth * 0.04,
    textAlign: 'center',
  },
  cursorR: {
    position: 'absolute',
    top: 0,
    right: '100%',
    width: '50%',
    height: '10%',
    resizeMode: 'stretch',
  },
  cursorL: {
    position: 'absolute',
    top: 0,
    left: '100%',
    width: '50%',
    height: '10%',
    resizeMode: 'stretch',
  },
});

export default PlayingCardsStyles;
