import { StyleSheet, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const cardWidth = ScreenWidth * 0.17;
const cardHeight = ScreenHeight * 0.28;

const CardStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: cardWidth,
    height: cardHeight,
  },
  leftColumn: {
    left: (ScreenWidth - (3 * cardWidth)) / 2,
  },
  centerColumn: {
    left: (ScreenWidth - cardWidth) / 2,
  },
  rightColumn: {
    left: (ScreenWidth + cardWidth) / 2,
  },
  topRow: {
    top: (ScreenHeight - (3 * cardHeight)) / 2,
  },
  centerRow: {
    top: (ScreenHeight - cardHeight) / 2,
  },
  bottomRow: {
    top: (ScreenHeight + cardHeight) / 2,
  },
  card: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default CardStyles;
