import { StyleSheet, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const cardWidth = ScreenWidth * 0.17;
const cardHeight = ScreenHeight * 0.28;

const TableStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -ScreenWidth / 2,
    resizeMode: 'stretch',
    width: ScreenWidth,
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
