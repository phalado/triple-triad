import React from 'react';
import { View, Button, Alert } from 'react-native';
import PropTypes from 'prop-types';
import GetDecksCards from './GetDecksCards';
import styles from '../styles/GameDeck';

const ChooseCardsDropZone = props => {
  const {
    deck, navigation, table, handleRemoveCard,
    npcDeck, location, npc, addCardsToStore,
  } = props;

  const removeCardHandler = (cardId, deck) => {
    deck.splice(deck.indexOf(cardId), 1, null).sort();
    handleRemoveCard(cardId, deck);
  };

  return (
    <View>
      <View style={{ ...styles.dropZone, zIndex: 0 }}>
        {deck.map((cardId, index) => (
          <GetDecksCards
            cardId={cardId}
            table={table}
            index={index}
            handleRemoveCard={removeCardHandler}
            deck={deck}
            key={[cardId, index]}
          />
        ))}
      </View>
      <Button
        style={{ margin: 20 }}
        title="Start Game"
        onPress={() => {
          if (deck.some(card => card === null)) {
            Alert.alert('Wait!', 'You need a full deck to enter in a game!', [
              {
                text: 'Whatever.',
                onPress: () => null,
                style: 'cancel',
              },
            ]);
          } else {
            addCardsToStore();
            navigation.goBack(null);
            navigation.push('GamePlay', { screen: 'GamePlay', params: { npcDeck, location, npc } });
          }
        }}
      />
    </View>
  );
};

ChooseCardsDropZone.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.number).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  addCardsToStore: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  npcDeck: PropTypes.arrayOf(PropTypes.number).isRequired,
  location: PropTypes.string.isRequired,
  npc: PropTypes.string.isRequired,
};

export default ChooseCardsDropZone;
