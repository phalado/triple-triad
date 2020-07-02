/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, FlatList, Image,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import cards from '../constants/Cards';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
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
          alt="Table"
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

const GameDeck = props => {
  const { table, route } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>See your cards and change your decks</Text>
      <FlatList
        data={cards}
        renderItem={({ item }) => <Item card={item} table={table} />}
        horizontal
        keyExtractor={card => card.name}
      />
    </SafeAreaView>
  );
};

export default GameDeck;
