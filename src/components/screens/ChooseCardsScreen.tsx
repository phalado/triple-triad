import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import Cards from "../../constants/Cards";
import { getCardsFromPlayerDeck, getFlatListCards } from "../../helpers/ExploreModeHelpers";
import ChooseCardsDropZone from "../ChooseCardsDropZone";
import GameDeckFlatList from "../GameDeckFlatList";
import CardObjectInterface from "../../interfaces/CardObjectInterface";
import GameOptionsInterface from "../../interfaces/GameOptionsInterface";
import { GameContext } from "../GameContext";
import styles from '../../styles/GameDeck';
import Texts from "../../constants/Texts";
import DecksInterface from "../../interfaces/DecksInterface";

const ChooseCardsScreen = (
  props: {
    navigation: any
    route: any
    playerCards: { [index: string]: number }
    gameOptions: GameOptionsInterface
    decks: DecksInterface
    changeDeck: (data: { deck: string, cards: number[] }) => void
    changeSelectedDeck: (deck: string) => void
  }
) => {
  const {
    navigation, route, playerCards, gameOptions, decks, changeDeck, changeSelectedDeck
  } = props
  const { language } = gameOptions
  const { npcDeck, location, npc } = route.params.params || route.params;
  const [myCards] = useState(getCardsFromPlayerDeck(playerCards));
  const [selectedDeck, setSelectedDeck] = useState(decks.selected === '' ? 'deck1' : decks.selected)
  const [myDeck, setMyDeck] = useState(decks[selectedDeck] || decks.deck1);
  const [flatListData, setFlatListData] = useState(getFlatListCards(myCards, myDeck));
  const { createCard, resetCards } = useContext(GameContext)
  const [texts] = useState(Texts[language as 'eng' | 'ptbr'])

  const addCardsToStore = () => {
    resetCards();
    myDeck.forEach((cardId: number, index: number) => {
      createCard(true, { id: cardId as number, row: 3 + index, column: 3, dragable: true });
    });

    npcDeck.forEach((cardId: number, index: number) => {
      createCard(false, { id: cardId, row: 3 + index, column: 3, dragable: true });
    });
  };

  useEffect(() => {
    changeSelectedDeck(selectedDeck)
    setMyDeck(decks[selectedDeck])
  }, [selectedDeck])
  
  useEffect(() => {
    setFlatListData(getFlatListCards(myCards, myDeck))
    changeDeck({ deck: selectedDeck, cards: [...myDeck] })
  },[myDeck])

  const handleAddCard = (cardId: number) => {
    if (myDeck.some((value: number) => value === 0)) {
      let newDeck = [...myDeck]
      newDeck.splice(myDeck.indexOf(0), 1, cardId)
      newDeck = newDeck.sort((a: any, b: any) => a.id - b.id)
      setMyDeck([...newDeck]);
      const thisCard = Cards.find(card => card.id === cardId) as CardObjectInterface;
      flatListData.splice(flatListData.indexOf(thisCard), 1).sort();
      setFlatListData(flatListData);
    }
  };

  const handleRemoveCard = (cardId: number) => {
    let newDeck = [...myDeck]
    newDeck.splice(myDeck.indexOf(cardId), 1, 0)
    newDeck = newDeck.sort((a: any, b: any) => a.id - b.id)
    setMyDeck([...newDeck]);
    const thisCard = Cards.find(card => card.id === cardId) as CardObjectInterface;
    flatListData.push(thisCard);
    setFlatListData(flatListData.sort((a: any, b: any) => a.id - b.id));
  };

  return (
    <View style={styles.container}>
      <GameDeckFlatList
        flatListData={flatListData.sort((
          a: CardObjectInterface, b: CardObjectInterface
        ) => b.id - a.id)}
        handleAddCard={handleAddCard}
        deck={myDeck}
        cards={myCards}
        texts={texts}
      />
      <ChooseCardsDropZone
        deck={myDeck}
        handleRemoveCard={handleRemoveCard}
        addCardsToStore={addCardsToStore}
        navigation={navigation}
        npcDeck={npcDeck}
        location={location}
        npc={npc}
        texts={texts}
        changeDeck={changeDeck}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
      />
    </View>
  )
}

export default ChooseCardsScreen
