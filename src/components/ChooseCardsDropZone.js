import React from 'react';
import { View, Button } from 'react-native';
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
    <View style={{ zIndex: -10 }}>
      <View style={styles.dropZone}>
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
          addCardsToStore();
          navigation.goBack(null);
          navigation.push('GamePlay', { screen: 'GamePlay', params: { npcDeck, location, npc } });
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
