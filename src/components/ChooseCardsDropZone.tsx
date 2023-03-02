import React from "react";
import { Alert, Button, View } from "react-native";
import styles from '../styles/GameDeck';
import GetDecksCards from "./GetDeckscards";

const ChooseCardsDropZone = (
  props: {
    deck: number[]
    navigation: any
    handleRemoveCard: (cardId: number) => void
    npcDeck: number[]
    location: string
    npc: string
    addCardsToStore: () => void
    texts: { [key: string]: string | string[] }
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
    texts
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
            key={JSON.stringify([cardId, index])}
            texts={texts}
          />
        ))}
      </View>
      <Button
        title={texts.startGame as string}
        onPress={() => {
          if (deck.some((card: number) => card === 0)) {
            Alert.alert(texts.wait as string, texts.fullDeck as string, [
              {
                text: texts.whatever as string,
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
