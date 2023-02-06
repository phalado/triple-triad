import React, { useState } from "react";
import { View } from "react-native";
import Cards from "../../constants/Cards";
import { getCardsFromPlayerDeck } from "../../helpers/ExploreModeHelpers";
import ChooseCardsDropZone from "../ChooseCardsDropZone";
import GameDeckFlatList from "../GameDeckFlatList";
import CardInterface from "../../interfaces/CardInterface";
import DecksInterface from "../../interfaces/DecksInterface";
import styles from '../../styles/GameDeck';
import TableInterface from "../../interfaces/TableInterface";

const ChooseCardsScreen = (
  props: {
    navigation: any
    route: any
    table: TableInterface
    decks: any
    playerCards: { [index: string]: number }
    changeDeck: (data: { player: boolean, deck: string, cards: number[] }) => void
    startDeck: () => void
    createCard: (player: boolean, card: CardInterface) => void
    resetCards: () => void
  }
) => {
  const {
    navigation,
    route,
    table,
    decks,
    playerCards,
    changeDeck,
    startDeck,
    createCard,
    resetCards,
  } = props
  const { npcDeck, location, npc } = route.params.params || route.params;
  const [myCards] = useState(getCardsFromPlayerDeck(playerCards));
  const [myDeck, setMyDeck] = useState([0, 0, 0, 0, 0]);
  const [flatListData, setFlatListData] = useState([...myCards]);

  const addCardsToStore = () => {
    resetCards();
    myDeck.forEach((cardId: number, index: number) => {
      createCard(true, { id: cardId as number, row: 3 + index, column: 3, dragable: true });
    });

    npcDeck.forEach((cardId: number, index: number) => {
      createCard(false, { id: cardId, row: 3 + index, column: 3, dragable: true });
    });
  };

  const handleAddCard = (cardId: number) => {
    if (myDeck.some((value: any) => value === 0)) {
      myDeck.splice(myDeck.indexOf(0), 1, cardId).sort();
      setMyDeck([...myDeck]);
      const thisCard = Cards.find(card => card.id === cardId);
      flatListData.splice(flatListData.indexOf(thisCard), 1).sort();
      setFlatListData(flatListData);
    }
  };

  const handleRemoveCard = (cardId: number) => {
    myDeck.splice(myDeck.indexOf(cardId), 1, 0).sort();
    setMyDeck([...myDeck]);
    const thisCard = Cards.find(card => card.id === cardId);
    flatListData.push(thisCard);
    setFlatListData(flatListData.sort((a: any, b: any) => a.id - b.id));
  };

  return (
    <View style={styles.container}>
      <GameDeckFlatList
        flatListData={flatListData.sort((a: any, b: any) => b.id - a.id)}
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
  )
}

export default ChooseCardsScreen
