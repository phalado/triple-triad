import React, { useContext, useState } from 'react';
import { Image, View } from 'react-native';
import Images from '../constants/Images';
import styles from '../styles/RankNumbers';
import { GameContext } from './GameContext';

const RankNumbers = (
  props: {
    ranks: (string | number)[],
    element: string,
    playCard?: { row: number, column: number, dragable: boolean },
    player0: boolean
    size: 'bigCard' | 'smallCard'
  }
) => {
  const { ranks, element, playCard, player0, size } = props;
  const { row, column, dragable } = playCard || { row: 0, column: 0, dragable: true };
  const { getCellElement } = useContext(GameContext)
  const cardStyles = styles[size]
  const rankUp = `rank${ranks[0]}`;
  const rankLf = `rank${ranks[1]}`;
  const rankRt = `rank${ranks[2]}`;
  const rankDn = `rank${ranks[3]}`;

  let [plusMinus] = useState('none');
  if ((!dragable || player0) && row < 8) {
    const cellElement = getCellElement(row, column)
    if (cellElement !== null) {
      plusMinus = cellElement === element ? 'plus' : 'minus';
    }
  }

  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.rankContainer}>
        <Image style={cardStyles.rankUp} source={Images[rankUp]} />
        <Image style={cardStyles.rankLeft} source={Images[rankLf]} />
        <Image style={cardStyles.rankDown} source={Images[rankDn]} />
        <Image style={cardStyles.rankRight} source={Images[rankRt]} />
      </View>
      <Image style={cardStyles.element} source={Images[element]} />
      {plusMinus !== 'none' && <Image style={cardStyles.plusMinus} source={Images[plusMinus]} />}
    </View>
  )
}

export default RankNumbers
