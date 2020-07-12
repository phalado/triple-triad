import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/ExploreScenes';

const ExploreScenes = props => {
  const { navigation } = props;

  return (
    <View>
      <Image style={styles.container} source={Images.balambGarden} alt="Table" />
    </View>
  );
};

ExploreScenes.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreScenes;
