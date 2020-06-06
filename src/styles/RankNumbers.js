import { StyleSheet, Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

const RankNumberStyles = StyleSheet.create({
  container: {
    position: 'relative',
    width: cardWidth / 3,
    height: cardHeight / 4,
  },
  rankUp: {
    position: 'absolute',
    width: cardWidth / 6,
    height: cardHeight / 6,
    top: 8,
    left: 20,
  },
  rankLeft: {
    position: 'absolute',
    width: cardWidth / 6,
    height: cardHeight / 6,
    top: 25,
    left: 8,
  },
  rankDown: {
    position: 'absolute',
    width: cardWidth / 6,
    height: cardHeight / 6,
    top: 35,
    left: 20,
  },
  rankRight: {
    position: 'absolute',
    width: cardWidth / 6,
    height: cardHeight / 6,
    top: 25,
    left: 35,
  },
  element: {
    position: 'absolute',
    width: cardWidth / 3,
    height: cardHeight / 3,
    top: 10,
    right: 10,
  },
});

export default RankNumberStyles;
