import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/RankNumbers';

const RankNumbers = props => {
  const { ranks, element } = props;
  const rankUp = `rank${ranks[0]}`;
  const rankLf = `rank${ranks[1]}`;
  const rankDn = `rank${ranks[2]}`;
  const rankRt = `rank${ranks[3]}`;

  return (
    <View>
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
    </View>
  );
};

export default RankNumbers;
