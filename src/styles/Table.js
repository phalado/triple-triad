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
});

export default TableStyles;
