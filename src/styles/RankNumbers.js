import { StyleSheet, Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

const rankUpDownConstant = 20;
const rankLeftRightConstant = 10;

const letterWidth = cardWidth / 6;
const letterheight = cardHeight / 6;

const RankNumberStyles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 62.5,
    left: cardWidth / 3.5,
  },
  rankUp: {
    position: 'absolute',
    width: letterWidth,
    height: letterheight,
    resizeMode: 'contain',
    top: 0,
    left: rankUpDownConstant,
  },
  rankLeft: {
    position: 'absolute',
    width: letterWidth,
    height: letterheight,
    resizeMode: 'contain',
    top: rankLeftRightConstant,
    left: 0,
  },
  rankDown: {
    position: 'absolute',
    width: letterWidth,
    height: letterheight,
    resizeMode: 'contain',
    top: 20,
    left: rankUpDownConstant,
  },
  rankRight: {
    position: 'absolute',
    width: letterWidth,
    height: letterheight,
    resizeMode: 'contain',
    top: rankLeftRightConstant,
    left: 38,
  },
  element: {
    position: 'absolute',
    width: cardWidth / 3,
    height: cardHeight / 3,
    resizeMode: 'contain',
    top: -52.5,
    right: cardWidth / 3,
  },
});

export default RankNumberStyles;
