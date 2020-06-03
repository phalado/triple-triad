/* eslint-disable global-require */
import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/Table';

const Table = () => (
  <View>
    <Image
      style={styles.container}
      source={require('../contents/img/board-mat.jpg')}
      alt="Table"
    />
  </View>
);

export default Table;
