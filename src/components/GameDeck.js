import React, { useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import Cards from '../constants/Cards';
import { getCardsFromPlayerDeck } from '../Helpers/ExploreModeHelper';
import GameDeckFlatList from './GameDeckFlatList';
import styles from '../styles/GameDeck';
import GameDeckDropZone from './GameDeckDropZone';

const GameDeck = props => {
  const {
    decks, table, route, navigation, changeDeck, startDeck, playerCards,
  } = props;
  const { deck, type } = route.params;
  const [myDecks, setMyDecks] = useState(decks);
  const [myCards] = useState((type === 'player')
    ? getCardsFromPlayerDeck(playerCards) : [...Cards].sort((a, b) => a > b));

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
  const getFlatListData = myCards => {
    const newCards = [...myCards];
    if (deck !== 'none') {
      myDecks[type][deck].forEach(cardId => {
        if (cardId !== null) {
          if (type === 'player' || cardId === 48 || cardId > 77) {
            newCards.splice(newCards.indexOf(newCards.find(c => c.id === cardId)), 1);
          }
        }
      });
    }
    return newCards;
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameDeckFlatList
        getFlatListData={getFlatListData}
        table={table}
        handleAddCard={handleAddCard}
        deck={deck}
        cards={myCards}
      />
      <GameDeckDropZone
        deck={deck}
        type={type}
        table={table}
        handleRemoveCard={handleRemoveCard}
        navigation={navigation}
        changeDeck={changeDeck}
        myDecks={myDecks}
      />
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
  playerCards: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GameDeck;
