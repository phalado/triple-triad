import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/RankNumbers';

const RankNumbers = props => {
  const { ranks, element, plusMinus } = props;
  const rankUp = `rank${ranks[0]}`;
  const rankLf = `rank${ranks[1]}`;
  const rankDn = `rank${ranks[2]}`;
  const rankRt = `rank${ranks[3]}`;

  const addPlusMinus = () => (
    <Image
      style={styles.plusMinus}
      source={Images[plusMinus]}
      alt="Plus or Minus"
    />
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.rankUp}
        source={Images[rankUp]}
        alt="Rank up"
      />
      <Image
        style={styles.rankLeft}
        source={Images[rankLf]}
        alt="Rank left"
      />
      <Image
        style={styles.rankDown}
        source={Images[rankDn]}
        alt="Rank down"
      />
      <Image
        style={styles.rankRight}
        source={Images[rankRt]}
        alt="Rank right"
      />
      <Image
        style={styles.element}
        source={Images[element]}
        alt="Element"
      />
      {plusMinus !== 'none' ? addPlusMinus() : null}
    </View>
  );
};

RankNumbers.propTypes = {
  ranks: PropTypes.arrayOf(PropTypes.number).isRequired,
  element: PropTypes.string.isRequired,
  plusMinus: PropTypes.string.isRequired,
};

export default RankNumbers;
