import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { TableWidth } = CSSSizes

const GamePlayStyles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#51361f',
    width: '100%'
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10%',
    width: TableWidth,
  }
});

export default GamePlayStyles;
