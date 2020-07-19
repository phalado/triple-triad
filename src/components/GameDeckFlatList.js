import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DeckAnimatedCard from './DeckAnimatedCard';
import styles from '../styles/GameDeck';

const GameDeckFlatList = props => {
  const {
    table, handleAddCard, deck, cards, getFlatListData, flatListData,
  } = props;
  const keys = [];
  // const [myDeck] = useState(deck);

  const getKey = cardName => {
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
};

GameDeckFlatList.propTypes = {
  deck: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  handleAddCard: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.any).isRequired,
  getFlatListData: PropTypes.func,
  flatListData: PropTypes.arrayOf(PropTypes.any),
};

GameDeckFlatList.defaultProps = {
  getFlatListData: null,
  flatListData: null,
};

export default GameDeckFlatList;
