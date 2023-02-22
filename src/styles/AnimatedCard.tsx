import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { cardWidth, cardHeight, ScreenHeight, TableWidth } = CSSSizes

const CardStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: cardWidth,
    height: cardHeight,
  },
  leftColumn: {
    left: (TableWidth - (3 * cardWidth)) / 2,
  },
  centerColumn: {
    left: (TableWidth - cardWidth) / 2,
  },
  rightColumn: {
    left: (TableWidth + cardWidth) / 2,
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
  cardBackground: {
    position: 'absolute',
    width: '96%',
    height: '96%',
    margin: '2%'
  },
});

export default CardStyles;
