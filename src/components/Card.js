/* eslint-disable react/prop-types */
import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Card';

const Card = props => {
  const { card, row, column } = props;
  let cardStye = styles.card;

  if (row === -1) {
    cardStye = { ...cardStye, ...styles.topRow };
  } else if (row === 0) {
    cardStye = { ...cardStye, ...styles.centerRow };
  } else {
    cardStye = { ...cardStye, ...styles.bottomRow };
  }

  if (column === -1) {
    cardStye = { ...cardStye, ...styles.leftColumn };
  } else if (row === 0) {
    cardStye = { ...cardStye, ...styles.centerColumn };
  } else {
    cardStye = { ...cardStye, ...styles.rightColumn };
  }

  return (
    <View style={styles.container}>
      <Image
        style={cardStye}
        source={card.image}
        alt="Table"
      />
    </View>
  );
};

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.string).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};

export default Card;
