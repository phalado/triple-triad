import React, { useContext, useState } from "react";
import { View } from "react-native";
import Cards from "../../constants/Cards";
import { getCardsFromPlayerDeck } from "../../helpers/ExploreModeHelpers";
import ChooseCardsDropZone from "../ChooseCardsDropZone";
import GameDeckFlatList from "../GameDeckFlatList";
import CardObjectInterface from "../../interfaces/CardObjectInterface";
import GameOptionsInterface from "../../interfaces/GameOptionsInterface";
import { GameContext } from "../GameContext";
import styles from '../../styles/GameDeck';
import Texts from "../../constants/Texts";

const ChooseCardsScreen = (
  props: {
    navigation: any
    route: any
    playerCards: { [index: string]: number },
    gameOptions: GameOptionsInterface
  }
) => {
  const { navigation, route, playerCards, gameOptions } = props
  const { language } = gameOptions
  const { npcDeck, location, npc } = route.params.params || route.params;
  const [myCards] = useState(getCardsFromPlayerDeck(playerCards));
  const [myDeck, setMyDeck] = useState([0, 0, 0, 0, 0]);
  const [flatListData, setFlatListData] = useState([...myCards]);
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

  const handleAddCard = (cardId: number) => {
    if (myDeck.some((value: number) => value === 0)) {
      myDeck.splice(myDeck.indexOf(0), 1, cardId).sort();
      setMyDeck([...myDeck]);
      const thisCard = Cards.find(card => card.id === cardId) as CardObjectInterface;
      flatListData.splice(flatListData.indexOf(thisCard), 1).sort();
      setFlatListData(flatListData);
    }
  };

  const handleRemoveCard = (cardId: number) => {
    myDeck.splice(myDeck.indexOf(cardId), 1, 0).sort();
    setMyDeck([...myDeck]);
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
      />
    </View>
  )
}

export default ChooseCardsScreen
