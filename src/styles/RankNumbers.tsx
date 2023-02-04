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
    flexDirection: 'column',
    top: '10%',
    left: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: cardHeight,
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
    width: cardWidth / 2.5,
    height: cardHeight / 2.5,
    resizeMode: 'contain',
    top: 0,
    right: '10%',
  },
  plusMinus: {
    position: 'relative',
    width: cardWidth / 2.5,
    height: cardHeight / 2.5,
    resizeMode: 'contain',
    margin: '15%',
  },
});

export default RankNumberStyles;
