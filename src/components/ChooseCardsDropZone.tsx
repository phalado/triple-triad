import React from "react";
import { Alert, Button, Text, View } from "react-native";
import styles from '../styles/GameDeck';
import GetDecksCards from "./GetDeckscards";

const ChooseCardsDropZone = (
  props: any
) => {
  const {
    deck, navigation, table, handleRemoveCard, npcDeck, location, npc, addCardsToStore,
  } = props;

  const removeCardHandler = (cardId: number, deck: number[]) => {
    deck.splice(deck.indexOf(cardId), 1, 0).sort();
    handleRemoveCard(cardId, deck);
  };

  return (
    <View>
      <View style={{ ...styles.dropZone, zIndex: 0 }}>
        {deck.map((cardId: number, index: number) => (
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
        // style={{ margin: 20 }}
        title="Start Game"
        onPress={() => {
          if (deck.some((card: number) => card === null)) {
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
