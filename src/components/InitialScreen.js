/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getRandomCards } from '../Helpers/OtherHelpers';
import styles from '../styles/App';

const InitialScreen = props => {
  const { decks, navigation, createCard } = props;

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
        style={{ margin: 20 }}
        title="Play random game"
        onPress={() => navigation.navigate('GamePlay')}
      />
      <Button
        style={{ margin: 20 }}
        title="Change game rules"
        onPress={() => navigation.navigate('Choose Rules')}
      />
      <Button
        style={{ margin: 20 }}
        title="All the cards"
        onPress={() => navigation.navigate('Game Deck', { deck: decks.custom.deck1 })}
      />
    </View>
  );
};

InitialScreen.propTypes = {
  decks: PropTypes.objectOf(PropTypes.object).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  createCard: PropTypes.func.isRequired,
};

export default InitialScreen;
