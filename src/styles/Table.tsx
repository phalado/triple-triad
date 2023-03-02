import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenWidth, ScreenHeight, TableWidth, cardWidth, cardHeight } = CSSSizes

const TableStyles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: -ScreenWidth / 2,
    resizeMode: 'stretch',
    width: ScreenWidth,
    height: ScreenHeight,
  },
  container: {
    position: 'absolute',
    left: -TableWidth / 2,
    resizeMode: 'stretch',
    width: TableWidth,
    height: ScreenHeight,
  },
  elementalSpot: {
    position: 'absolute',
    width: cardWidth / 2,
    height: cardHeight / 2,
  },
  hamburguerIcon: {
    position: 'absolute',
    width: cardWidth / 3,
    height: cardHeight / 3,
    left: -ScreenWidth / 2.1
  }
});

export default TableStyles;
