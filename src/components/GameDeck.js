/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  View, Text, FlatList, Button,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DeckAnimatedCard from './DeckAnimatedCard';
import GetDecksCards from './GetDecksCards';
import Cards from '../constants/Cards';
import { getDeckButtons } from '../Helpers/OtherHelpers';
import styles from '../styles/GameDeck';

const GameDeck = props => {
  const {
    decks, table, route, navigation, changeDeck,
  } = props;
  const { deck } = route.params;
  const [myDecks, setMyDecks] = useState(decks);

  const handleRemoveCard = (cardId, deck) => {
    setMyDecks({
      player: myDecks.player,
      custom: {
        ...myDecks.custom,
        [deck]: myDecks.custom[deck].splice(myDecks.custom[deck].indexOf(cardId), 1, null)
          .sort(),
      },
    });
    changeDeck(myDecks);
    navigation.pop();
    navigation.push('Game Deck', { screen: 'Game Deck', params: { deck } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: '50%', alignItems: 'center' }}>
        <Text style={styles.title}>See your cards and change your decks</Text>
        <FlatList
          data={Cards}
          renderItem={({ item }) => <DeckAnimatedCard card={item} table={table} />}
          horizontal
          keyExtractor={card => card.name}
        />
      </View>
      <View>
        <View style={deck === 'none' ? styles.buttons : styles.dropZone}>
          {deck !== 'none'
            ? myDecks.custom[deck].map((cardId, index) => GetDecksCards({
              cardId, table, index, handleRemoveCard, deck,
            }))
            : getDeckButtons(navigation, styles.buttons)}
        </View>
        {deck === 'none' ? null
          : (
            <Button
              style={{ margin: 20 }}
              title="Save deck"
              onPress={() => {
                navigation.goBack(null);
                navigation.navigate('Game Deck', { deck: myDecks.custom.deck1 });
              }}
            />
          )}
      </View>
    </SafeAreaView>
  );
};

export default GameDeck;
