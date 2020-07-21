import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/GameDeck';
import GameDeckFlatList from './GameDeckFlatList';
import { getCardsFromPlayerDeck } from '../Helpers/ExploreModeHelper';
import ChooseCardsDropZone from './ChooseCardsDropZone';
import Cards from '../constants/Cards';

const ChooseCardsScreen = props => {
  const {
    table, playerCards, resetCards, createCard, navigation, route,
  } = props;
  const { npcDeck, location, npc } = route.params.params || route.params;
  const [myCards] = useState(getCardsFromPlayerDeck(playerCards));
  const [myDeck, setMyDeck] = useState([null, null, null, null, null]);
  const [flatListData, setFlatListData] = useState([...myCards]);
  // console.log(playerCards);

  const addCardsToStore = () => {
    resetCards();
    myDeck.forEach((card, index) => {
      createCard({
        player: true, id: card, row: 3 + index, column: 3, dragable: true,
      });
    });

    npcDeck.forEach((card, index) => {
      createCard({
        player: false, id: card, row: 3 + index, column: 3, dragable: true,
      });
    });
  };

  const handleAddCard = cardId => {
    if (myDeck.some(value => value === null)) {
      myDeck.splice(myDeck.indexOf(null), 1, cardId).sort();
      setMyDeck([...myDeck]);
      const thisCard = Cards.find(card => card.id === cardId);
      flatListData.splice(flatListData.indexOf(thisCard), 1).sort();
      setFlatListData(flatListData);
    }
  };

  const handleRemoveCard = cardId => {
    myDeck.splice(myDeck.indexOf(cardId), 1, null).sort();
    setMyDeck([...myDeck]);
    const thisCard = Cards.find(card => card.id === cardId);
    flatListData.push(thisCard);
    setFlatListData(flatListData.sort((a, b) => a.id < b.id));
  };

  return (
    <View style={styles.container}>
      <GameDeckFlatList
        flatListData={flatListData.sort((a, b) => a.id < b.id)}
        table={table}
        handleAddCard={handleAddCard}
        deck={myDeck}
        cards={myCards}
      />
      <ChooseCardsDropZone
        table={table}
        deck={myDeck}
        handleRemoveCard={handleRemoveCard}
        addCardsToStore={addCardsToStore}
        navigation={navigation}
        npcDeck={npcDeck}
        location={location}
        npc={npc}
      />
    </View>
  );
};

ChooseCardsScreen.propTypes = {
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
  playerCards: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChooseCardsScreen;
