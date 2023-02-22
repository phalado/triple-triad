import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenHeight } = CSSSizes

const GameDrawerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: ScreenHeight,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default GameDrawerStyle;
