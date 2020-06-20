import { StyleSheet, Dimensions } from 'react-native';

const PlayingCardsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: Dimensions.get('window').width * 0.17,
    height: Dimensions.get('window').height * 0.9,
    top: Dimensions.get('window').height * 0.02,
  },
  play1: {
    right: Dimensions.get('window').width * 0.025,
  },
  play2: {
    left: Dimensions.get('window').width * 0.025,
  },
  nameText: {
    fontSize: Dimensions.get('window').width * 0.04,
    textAlign: 'center',
  },
  scoreText: {
    position: 'absolute',
    bottom: -Dimensions.get('window').height * 0.04,
    left: Dimensions.get('window').width * 0.01,
    fontSize: Dimensions.get('window').width * 0.04,
    textAlign: 'center',
  },
});

export default PlayingCardsStyles;
