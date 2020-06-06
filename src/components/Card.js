import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Card';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';

const Card = props => {
  const {
    card, row, column, player,
  } = props;
  let cardContainer = styles.container;

  if (row === -1) {
    cardContainer = { ...cardContainer, ...styles.topRow };
  } else if (row === 0) {
    cardContainer = { ...cardContainer, ...styles.centerRow };
  } else {
    cardContainer = { ...cardContainer, ...styles.bottomRow };
  }

  if (column === -1) {
    cardContainer = { ...cardContainer, ...styles.leftColumn };
  } else if (column === 0) {
    cardContainer = { ...cardContainer, ...styles.centerColumn };
  } else {
    cardContainer = { ...cardContainer, ...styles.rightColumn };
  }

  return (
    <View style={cardContainer}>
      <Image
        style={styles.card}
        source={Images[player]}
        alt="Background"
      />
      <Image
        style={styles.card}
        source={Images[card.id]}
        alt="Table"
      />
      <RankNumbers ranks={card.ranks} element={card.element} />
    </View>
  );
};

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  player: PropTypes.string.isRequired,
};

export default Card;
