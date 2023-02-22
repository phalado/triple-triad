import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const TableWidth = ScreenWidth * 0.8
const ScreenHeight = Dimensions.get('window').height;

const cardWidth = TableWidth * 0.17;
const cardHeight = ScreenHeight * 0.28;

const rankUpDownConstant = 20;
const rankLeftRightConstant = 10;

const letterWidth = cardWidth / 6;
const letterheight = cardHeight / 6;

const CSSSizes = {
  ScreenWidth,
  ScreenHeight,
  TableWidth,
  cardWidth,
  cardHeight,
  rankUpDownConstant,
  rankLeftRightConstant,
  letterWidth,
  letterheight
}

export default CSSSizes;
