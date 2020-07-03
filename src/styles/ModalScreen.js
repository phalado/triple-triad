import { StyleSheet } from 'react-native';

const ChangeTurnModalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: '20%',
    height: '50%',
    resizeMode: 'stretch',
  },
  gameOverImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'stretch',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ChangeTurnModalStyles;
