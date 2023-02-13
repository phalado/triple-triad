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
  }
) => {
  const { ranks, element, playCard, player0 } = props;
  const { row, column, dragable } = playCard || { row: 0, column: 0, dragable: true };
  const { getCellElement } = useContext(GameContext)
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
    <View style={styles.container}>
      <Image style={styles.rankUp} source={Images[rankUp]} />
      <Image style={styles.rankLeft} source={Images[rankLf]} />
      <Image style={styles.rankDown} source={Images[rankDn]} />
      <Image style={styles.rankRight} source={Images[rankRt]} />
      <Image style={styles.element} source={Images[element]} />
      {plusMinus !== 'none' && <Image style={styles.plusMinus} source={Images[plusMinus]} />}
    </View>
  )
}

export default RankNumbers
