import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import GetDecksCards from "./GetDeckscards";
import ChooseDeckModal from "./modals/ChooseDeckModal";
import styles from '../styles/GameDeck';

const ChooseCardsDropZone = (
  props: {
    deck: number[]
    navigation: any
    handleRemoveCard: (cardId: number) => void
    npcDeck: number[]
    location: string
    npc: string
    addCardsToStore: () => void
    texts: { [key: string]: string }
    changeDeck: (data: { deck: string, cards: number[] }) => void
    selectedDeck: '' | 'deck1' | 'deck2' | 'deck3' | 'deck4' | 'deck5'
    setSelectedDeck: any
  }
) => {
  const {
    deck,
    navigation,
    handleRemoveCard,
    npcDeck = [],
    location = 'choose',
    npc = '',
    addCardsToStore,
    texts,
    selectedDeck,
    setSelectedDeck
  } = props;
  const [visibleModal, setVisibleModal] = useState(false)

  const removeCardHandler = (cardId: number, deck: number[]) => {
    handleRemoveCard(cardId);
  };

  return (
    <View>
      <View style={{ ...styles.dropZone, zIndex: 0 }}>
        <ChooseDeckModal
          visible={visibleModal}
          setVisible={setVisibleModal}
          selectedDeck={selectedDeck}
          setSelectedDeck={setSelectedDeck}
        />
        <View style={styles.buttonsContainer}>
          <Text style={styles.deckText}>{texts[selectedDeck]}</Text>
          <Button title={texts.changeDeck} onPress={() => setVisibleModal(true)} />
          <Button title={texts.goBack} onPress={() => navigation.goBack(null)} />
          {location !== 'choose' && <Button
            title={texts.startGame}
            color={'black'}
            onPress={() => {
              if (deck.some((card: number) => card === 0)) {
                Alert.alert(texts.wait, texts.fullDeck, [
                  {
                    text: texts.whatever,
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
          />}
        </View>
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
    </View>
  );
}

export default ChooseCardsDropZone
