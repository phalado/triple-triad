import React, { useState } from 'react';
import {
  View, Text, FlatList, Button,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import DeckAnimatedCard from './DeckAnimatedCard';
import GetDecksCards from './GetDecksCards';
import Cards from '../constants/Cards';
import { getDeckButtons } from '../Helpers/OtherHelpers';
import styles from '../styles/GameDeck';

const GameDeck = props => {
  const {
    decks, table, route, navigation, changeDeck, startDeck,
  } = props;
  const { deck, type } = route.params;
  const [myDecks, setMyDecks] = useState(decks);
  const myCards = Cards.sort((a, b) => a > b);

  if (Object.entries(decks).length === 0) {
    startDeck();
  }

  const handleRemoveCard = (cardId, deck) => {
    setMyDecks({
      ...myDecks,
      [type]: {
        ...myDecks[type],
        [deck]: myDecks[type][deck].splice(myDecks[type][deck].indexOf(cardId), 1, null)
          .sort(),
      },
    });
    changeDeck(myDecks);
    navigation.pop();
    navigation.push('Game Deck', { screen: 'Game Deck', params: { deck, type } });
  };

  const handleAddCard = (cardId, deck) => {
    if (myDecks[type][deck].some(value => value === null)) {
      setMyDecks({
        ...myDecks,
        [type]: {
          ...myDecks[type],
          [deck]: myDecks[type][deck].splice(myDecks[type][deck].indexOf(null), 1, cardId)
            .sort(),
        },
      });
      changeDeck(myDecks);
      navigation.pop();
      navigation.push('Game Deck', { screen: 'Game Deck', params: { deck, type } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: '50%', alignItems: 'center' }}>
        <Text style={styles.title}>See your cards and change your decks</Text>
        <FlatList
          data={myCards}
          renderItem={({ item }) => (
            <DeckAnimatedCard
              card={item}
              table={table}
              handleAddCard={handleAddCard}
              deck={deck}
            />
          )}
          horizontal
          keyExtractor={card => card.name}
        />
      </View>
      <View>
        <View style={deck === 'none' ? styles.buttons : styles.dropZone}>
          {deck !== 'none'
            ? myDecks[type][deck].map((cardId, index) => GetDecksCards({
              cardId, table, index, handleRemoveCard, deck,
            }))
            : getDeckButtons(navigation, styles.buttons, 'Game Deck')}
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
    </SafeAreaView>
  );
};

GameDeck.propTypes = {
  decks: PropTypes.objectOf(PropTypes.object).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  changeDeck: PropTypes.func.isRequired,
  startDeck: PropTypes.func.isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GameDeck;
