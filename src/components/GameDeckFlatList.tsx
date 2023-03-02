import React from "react";
import { FlatList, Text, View } from "react-native";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import styles from '../styles/GameDeck';
import DeckAnimatedCard from "./DeckAnimatedCard";

const GameDeckFlatList = (
  props: {
    flatListData?: CardObjectInterface[]
    getFlatListData?: any
    handleAddCard: (cardId: number) => void
    deck: number[]
    cards: CardObjectInterface[]
    texts: { [key: string]: string | string[] }
  }
) => {
  const { flatListData, getFlatListData, handleAddCard, deck, cards, texts } = props
  const keys = [];

  const getKey = (cardName: string) => {
    keys.push(cardName);
    return `${cardName}${keys.length}`;
  };

  return (
    <View style={{ height: '50%', alignItems: 'center' }}>
      <Text style={styles.title}>{texts.seeYourCards}</Text>
      <FlatList
        data={flatListData || getFlatListData(cards)}
        renderItem={({ item }) => (
          <DeckAnimatedCard
            card={item}
            handleAddCard={handleAddCard}
            deck={deck}
          />
        )}
        horizontal
        keyExtractor={card => getKey(card.name)}
      />
    </View>
  );
}

export default GameDeckFlatList
