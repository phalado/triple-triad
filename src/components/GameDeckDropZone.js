import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import GetDecksCards from './GetDecksCards';
import { getDeckButtons } from '../Helpers/OtherHelpers';
import styles from '../styles/GameDeck';

const GameDeckDropZone = props => {
  const {
    deck, type, table, handleRemoveCard, navigation, changeDeck, myDecks,
  } = props;
  return (
    <View style={{ zIndex: -10 }}>
      <View style={deck === 'none' ? styles.buttons : styles.dropZone}>
        {deck !== 'none'
          ? myDecks[type][deck].map((cardId, index) => GetDecksCards({
            cardId, table, index, handleRemoveCard, deck,
          }))
          : getDeckButtons(navigation, styles.buttons, 'Game Deck', type)}
      </View>
      {deck === 'none' ? null
        : (
          <Button
            style={{ margin: 20 }}
            title="Save deck"
            onPress={() => {
              changeDeck(myDecks);
              navigation.goBack(null);
              navigation.navigate('Game Deck', { deck: myDecks[type].deck1, type });
            }}
          />
        )}
    </View>
  );
};

GameDeckDropZone.propTypes = {
  myDecks: PropTypes.objectOf(PropTypes.object).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  changeDeck: PropTypes.func.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  deck: PropTypes.string.isRequired,
};

export default GameDeckDropZone;
