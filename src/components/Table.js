/* eslint-disable global-require */
import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import ElementalBoard from '../container/ElementalBoard';
import Images from '../constants/Images';
import styles from '../styles/Table';

const Table = props => {
  const { elemental } = props;

  return (
    <View>
      <Image style={styles.container} source={Images.board} alt="Table" />
      <ElementalBoard elemental={elemental} />
    </View>
  );
};

Table.propTypes = {
  elemental: PropTypes.bool.isRequired,
};

export default Table;
