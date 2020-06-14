import { StyleSheet, Dimensions } from 'react-native';

const PlayingCardsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').height * 0.9,
    top: Dimensions.get('window').height * 0.05,
  },
  play1: {
    right: Dimensions.get('window').width * 0.025,
  },
  play2: {
    left: Dimensions.get('window').width * 0.025,
  },
  scoreText: {
    bottom: -270,
  },
});

export default PlayingCardsStyles;
