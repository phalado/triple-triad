import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getDeckButtons } from '../Helpers/OtherHelpers';
import styles from '../styles/DeckDrawer';

const GameDrawer = props => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Hello Stranger!!!</Text>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Select a deck: </Text>
        {getDeckButtons(navigation, styles.buttonsContainer, 'Game Deck')}
      </View>
    </View>
  );
};

GameDrawer.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GameDrawer;
