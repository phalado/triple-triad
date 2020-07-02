import React from 'react';
import {
  View, Text, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/DeckDrawer';

const GameDrawer = props => {
  const { decks, navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Hello Stranger!!!</Text>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Select a deck: </Text>
        <Button
          title="Deck 1"
          onPress={() => {
            navigation.goBack(null);
            navigation.navigate('Game Deck', { deck: decks.custom.deck1 });
          }}
        />
        <Button
          title="Deck 2"
          onPress={() => {
            navigation.goBack(null);
            navigation.navigate('Game Deck', { deck: decks.custom.deck2 });
          }}
        />
        <Button
          title="Deck 3"
          onPress={() => {
            navigation.goBack(null);
            navigation.navigate('Game Deck', { deck: decks.custom.deck3 });
          }}
        />
        <Button
          title="Deck 4"
          onPress={() => {
            navigation.goBack(null);
            navigation.navigate('Game Deck', { deck: decks.custom.deck4 });
          }}
        />
        <Button
          title="Deck 5"
          onPress={() => {
            navigation.goBack(null);
            navigation.navigate('Game Deck', { deck: decks.custom.deck5 });
          }}
        />
      </View>
    </View>
  );
};

GameDrawer.propTypes = {
  decks: PropTypes.objectOf(PropTypes.object).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GameDrawer;
