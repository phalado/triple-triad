import { StyleSheet, Dimensions } from 'react-native';

const PlayingCardsStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.9,
    top: Dimensions.get('window').height * 0.05,
    textAlign: 'center',
  },
  play1: {
    right: Dimensions.get('window').width * 0.025,
  },
  play2: {
    left: Dimensions.get('window').width * 0.025,
  },
  scoreText: {
    color: 'white',
    fontSize: 30,
    position: 'absolute',
    bottom: 0,
  },
});

export default PlayingCardsStyles;
