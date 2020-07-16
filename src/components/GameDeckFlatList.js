import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DeckAnimatedCard from './DeckAnimatedCard';
import styles from '../styles/GameDeck';

const GameDeckFlatList = props => {
  const {
    getFlatListData, table, handleAddCard, deck, cards,
  } = props;
  return (
    <View style={{ height: '50%', alignItems: 'center' }}>
      <Text style={styles.title}>See your cards and change your decks</Text>
      <FlatList
        data={getFlatListData(cards)}
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
  );
};

GameDeckFlatList.propTypes = {
  getFlatListData: PropTypes.func.isRequired,
  deck: PropTypes.string.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  handleAddCard: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default GameDeckFlatList;
