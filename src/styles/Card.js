import { StyleSheet, Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width / 7;
const cardHeight = Dimensions.get('window').height / 3;

const CardStyles = StyleSheet.create({
  container: {
    zIndex: 5,
    position: 'absolute',
    top: (Dimensions.get('window').height - cardHeight) / 2,
    left: (Dimensions.get('window').width - cardWidth) / 2,
    width: cardWidth,
    height: cardHeight,
  },
  card: {
    width: '100%',
    height: '100%',
  },
});

export default CardStyles;
