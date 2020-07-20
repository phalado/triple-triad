import { StyleSheet, Dimensions } from 'react-native';

const GameOverScreenStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: Dimensions.get('window').height,
  },
  images: {
    height: '50%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default GameOverScreenStyles;
