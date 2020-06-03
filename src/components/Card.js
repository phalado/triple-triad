/* eslint-disable global-require */
import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/Card';

const Card = () => (
  <View style={styles.container}>
    <Image
      style={styles.card}
      source={require('../contents/img/cards/110.png')}
      alt="Table"
    />
  </View>
);

export default Card;
