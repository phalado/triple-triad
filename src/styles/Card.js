import { StyleSheet, Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

const CardStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: cardWidth,
    height: cardHeight,
  },
  leftColumn: {
    left: (Dimensions.get('window').width - (3 * cardWidth)) / 2,
  },
  centerColumn: {
    left: (Dimensions.get('window').width - cardWidth) / 2,
  },
  rightColumn: {
    left: (Dimensions.get('window').width + cardWidth) / 2,
  },
  topRow: {
    top: (Dimensions.get('window').height - (3 * cardHeight)) / 2,
  },
  centerRow: {
    top: (Dimensions.get('window').height - cardHeight) / 2,
  },
  bottomRow: {
    top: (Dimensions.get('window').height + cardHeight) / 2,
  },
  card: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default CardStyles;
