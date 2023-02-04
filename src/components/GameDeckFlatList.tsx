import React from "react";
import { FlatList, Text, View } from "react-native";
import styles from '../styles/GameDeck';
import DeckAnimatedCard from "./DeckAnimatedCard";

const GameDeckFlatList = (
  props: {
    flatListData?: any
    getFlatListData?: any
    table: any
    handleAddCard: (cardId: number) => void
    deck: any
    cards: any
  }
) => {
  const { flatListData, getFlatListData, table, handleAddCard, deck, cards } = props
  const keys = [];

  const getKey = (cardName: string) => {
    keys.push(cardName);
    return `${cardName}${keys.length}`;
  };

  return (
    <View style={{ height: '50%', alignItems: 'center' }}>
      <Text style={styles.title}>See your cards and change your decks</Text>
      <FlatList
        data={flatListData || getFlatListData(cards)}
        renderItem={({ item }) => (
          <DeckAnimatedCard
            card={item}
            table={table}
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
