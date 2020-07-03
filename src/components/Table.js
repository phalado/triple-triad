/* eslint-disable global-require */
import React from 'react';
import { View, Image } from 'react-native';
import ElementalBoard from '../container/ElementalBoard';
import Images from '../constants/Images';
import styles from '../styles/Table';

const Table = () => (
  <View>
    <Image style={styles.container} source={Images.board} alt="Table" />
    <ElementalBoard />
  </View>
);

export default Table;
