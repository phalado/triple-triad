import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const TableWidth = ScreenWidth * 0.8
const ScreenHeight = Dimensions.get('window').height;

const cardWidth = TableWidth * 0.17;
const cardHeight = ScreenHeight * 0.28;

const bigLetterWidth = cardWidth / 5;
const bigLetterheight = cardHeight / 5;

const bigRankUpDownConstant = (cardWidth / 4) - (bigLetterWidth / 2);
const bigRankLeftRightConstant = (cardHeight / 4) - (bigLetterheight / 2);

const smallLetterWidth = cardWidth / 7;
const smallLetterheight = cardHeight / 7;

const smallRankUpDownConstant = (cardWidth / 6) - (smallLetterWidth / 2);
const smallRankLeftRightConstant = (cardHeight / 6) - (smallLetterheight / 2);

const CSSSizes = {
  ScreenWidth,
  ScreenHeight,
  TableWidth,
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
}

export default CSSSizes;
