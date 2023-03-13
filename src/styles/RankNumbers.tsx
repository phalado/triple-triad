import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const {
  cardWidth,
  cardHeight,
  bigLetterWidth,
  bigLetterheight,
  bigRankUpDownConstant,
  bigRankLeftRightConstant,
  smallLetterWidth,
  smallLetterheight,
  smallRankUpDownConstant,
  smallRankLeftRightConstant,
} = CSSSizes

const RankNumberStyles = {
  bigCard: StyleSheet.create({
    container: {
      position: 'relative',
      top: '10%',
      left: '10%',
    },
    rankContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: cardWidth / 2,
      height: cardHeight / 2
    },
    rankUp: {
      position: 'absolute',
      width: bigLetterWidth,
      height: bigLetterheight,
      resizeMode: 'contain',
      top: 0,
      left: bigRankUpDownConstant,
    },
    rankLeft: {
      position: 'absolute',
      width: bigLetterWidth,
      height: bigLetterheight,
      resizeMode: 'contain',
      top: bigRankLeftRightConstant,
      left: 0,
    },
    rankDown: {
      position: 'absolute',
      width: bigLetterWidth,
      height: bigLetterheight,
      resizeMode: 'contain',
      bottom: 0,
      left: bigRankUpDownConstant,
    },
    rankRight: {
      position: 'absolute',
      width: bigLetterWidth,
      height: bigLetterheight,
      resizeMode: 'contain',
      top: bigRankLeftRightConstant,
      right: 0,
    },
    element: {
      position: 'absolute',
      width: cardWidth / 2.5,
      height: cardHeight / 2.5,
      resizeMode: 'contain',
      top: 0,
      right: cardWidth / 3,
    },
    plusMinus: {
      position: 'absolute',
      top: cardHeight * 1.3,
      right: cardWidth / 2.5,
      width: cardWidth / 2.5,
      height: cardHeight / 2.5,
      resizeMode: 'contain',
      // margin: '15%',
    },
  }),
  smallCard: StyleSheet.create({
    container: {
      position: 'relative',
      top: '5%',
      left: '5%',
    },
    rankContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: cardWidth / 3,
      height: cardHeight / 3
    },
    rankUp: {
      position: 'absolute',
      width: smallLetterWidth,
      height: smallLetterheight,
      resizeMode: 'contain',
      top: 0,
      left: smallRankUpDownConstant,
    },
    rankLeft: {
      position: 'absolute',
      width: smallLetterWidth,
      height: smallLetterheight,
      resizeMode: 'contain',
      top: smallRankLeftRightConstant,
      left: 0,
    },
    rankDown: {
      position: 'absolute',
      width: smallLetterWidth,
      height: smallLetterheight,
      resizeMode: 'contain',
      bottom: 0,
      left: smallRankUpDownConstant,
    },
    rankRight: {
      position: 'absolute',
      width: smallLetterWidth,
      height: smallLetterheight,
      resizeMode: 'contain',
      top: smallRankLeftRightConstant,
      right: 0,
    },
    element: {
      position: 'absolute',
      width: cardWidth / 2.5,
      height: cardHeight / 2.5,
      resizeMode: 'contain',
      top: 0,
      right: cardWidth / 6,
    },
    plusMinus: {
      position: 'absolute',
      top: cardHeight / 2,
      right: cardWidth / 6,
      width: cardWidth / 2.5,
      height: cardHeight / 2.5,
      resizeMode: 'contain',
      // margin: '15%',
    },
  })
};

export default RankNumberStyles;
