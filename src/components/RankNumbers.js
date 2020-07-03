import React, { useState } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/RankNumbers';

const RankNumbers = props => {
  const {
    ranks, element, table, playCard,
  } = props;
  const { row, column, dragable } = playCard;
  const rankUp = `rank${ranks[0]}`;
  const rankLf = `rank${ranks[1]}`;
  const rankRt = `rank${ranks[2]}`;
  const rankDn = `rank${ranks[3]}`;

  let [plusMinus] = useState('none');
  if (!dragable) {
    if (table[row][column][2] !== null) {
      plusMinus = table[row][column][2] === element ? 'plus' : 'minus';
    }
  }

  if (plusMinus === 'none') {
    return (
      <View style={styles.container}>
        <Image style={styles.rankUp} source={Images[rankUp]} alt="Rank up" />
        <Image style={styles.rankLeft} source={Images[rankLf]} alt="Rank left" />
        <Image style={styles.rankDown} source={Images[rankDn]} alt="Rank down" />
        <Image style={styles.rankRight} source={Images[rankRt]} alt="Rank right" />
        <Image style={styles.element} source={Images[element]} alt="Element" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.rankUp} source={Images[rankUp]} alt="Rank up" />
      <Image style={styles.rankLeft} source={Images[rankLf]} alt="Rank left" />
      <Image style={styles.rankDown} source={Images[rankDn]} alt="Rank down" />
      <Image style={styles.rankRight} source={Images[rankRt]} alt="Rank right" />
      <Image style={styles.element} source={Images[element]} alt="Element" />
      <Image style={styles.plusMinus} source={Images[plusMinus]} alt="Plus or Minus" />
    </View>
  );
};

RankNumbers.propTypes = {
  ranks: PropTypes.arrayOf(PropTypes.number).isRequired,
  element: PropTypes.string.isRequired,
  playCard: PropTypes.shape({
    row: PropTypes.number,
    column: PropTypes.number,
    dragable: PropTypes.bool,
  }).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default RankNumbers;
