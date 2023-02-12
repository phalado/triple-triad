import React from "react";
import { Alert, Button, View } from "react-native";
import styles from '../styles/GameDeck';
import GetDecksCards from "./GetDeckscards";

const ChooseCardsDropZone = (
  props: {
    deck: any
    navigation: any
    handleRemoveCard: (cardId: number) => void
    npcDeck: number[]
    location: string
    npc: string
    addCardsToStore: () => void
  }
) => {
  const {
    deck,
    navigation,
    handleRemoveCard,
    npcDeck,
    location,
    npc,
    addCardsToStore,
  } = props;

  const removeCardHandler = (cardId: number, deck: number[]) => {
    deck.splice(deck.indexOf(cardId), 1, 0).sort();
    handleRemoveCard(cardId);
  };

  return (
    <View>
      <View style={{ ...styles.dropZone, zIndex: 0 }}>
        {deck.map((cardId: number, index: number) => (
          <GetDecksCards
            cardId={cardId}
            index={index}
            handleRemoveCard={removeCardHandler}
            deck={deck}
            key={[cardId, index]}
          />
        ))}
      </View>
      <Button
        title="Start Game"
        onPress={() => {
          if (deck.some((card: number) => card === 0)) {
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
}

export default ChooseCardsDropZone
