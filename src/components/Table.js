/* eslint-disable global-require */
import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/Table';
import Images from '../constants/Images';

const Table = () => (
  <View>
    <Image
      style={styles.container}
      source={Images.board}
      alt="Table"
    />
  </View>
);

export default Table;
