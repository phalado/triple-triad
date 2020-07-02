/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, Button,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Cards from '../constants/Cards';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
import { getDeckButtons } from '../Helpers/OtherHelpers';
import styles from '../styles/GameDeck';

const Item = props => {
  const { card, table } = props;

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{card.name}</Text>
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={Images.player0}
          alt="Background"
        />
        <Image
          style={styles.image}
          source={Images[card.id]}
          alt="Card"
        />
        <RankNumbers
          ranks={card.ranks}
          element={card.element}
          table={table}
          playCard={{ row: 0, column: 0, dragable: false }}
        />
      </View>
    </View>
  );
};

const getDecksCards = props => {
  const {
    cardId, table, index, handleRemoveCard, deck,
  } = props;

  if (cardId) {
    const card = Cards.find(crd => crd.id === cardId);
    return (
      <View style={styles.playerCardContainer} key={[cardId, index]}>
        <Text style={styles.title}>{card.name}</Text>
        <View style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={Images.player0}
            alt="Background"
          />
          <Image
            style={styles.image}
            source={Images[card.id]}
            alt="Card"
          />
          <RankNumbers
            ranks={card.ranks}
            element={card.element}
            table={table}
            playCard={{ row: 0, column: 0, dragable: false }}
          />
          <Text
            style={styles.removeClickable}
            title="Remove Card"
            onPress={() => handleRemoveCard(cardId, deck)}
          >
            {'  '}
            x
            {'  '}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.playerCardContainer} key={[cardId, index]}>
      <Text style={styles.title}>Empty spot</Text>
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={Images.player0}
          alt="Background"
        />
      </View>
    </View>
  );
};

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
          renderItem={({ item }) => <Item card={item} table={table} />}
          horizontal
          keyExtractor={card => card.name}
        />
      </View>
      <View>
        <View style={deck === 'none' ? styles.buttons : styles.dropZone}>
          {deck !== 'none'
            ? myDecks.custom[deck].map((cardId, index) => getDecksCards({
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
