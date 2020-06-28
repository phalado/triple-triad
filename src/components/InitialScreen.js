/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getRandomCards } from '../Helpers/OtherHelpers';
import styles from '../styles/App';

const InitialScreen = props => {
  const { navigation, createCard } = props;

  useEffect(() => {
    let newCards = getRandomCards();
    newCards.forEach((card, index) => {
      createCard({
        player: true, id: card, row: 3 + index, column: 3, dragable: true,
      });
    });

    newCards = getRandomCards();
    newCards.forEach((card, index) => {
      createCard({
        player: false, id: card, row: 3 + index, column: 3, dragable: true,
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Play random game"
        onPress={() => navigation.navigate('GamePlay')}
      />
    </View>
  );
};

InitialScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  createCard: PropTypes.func.isRequired,
};

export default InitialScreen;
