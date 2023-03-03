import React, { useCallback, useContext, useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { GameContext } from "../GameContext";
// import { Audio } from "expo-av";
import RankNumbers from "../RankNumbers";
import CardModal from "../modals/CardModal";

import { looseTheme, winTheme } from "../../constants/Sounds";
import Images from "../../constants/Images";
import Cards from "../../constants/Cards";
import places from '../../constants/Places';
import { getCardsId, getRandomCards } from "../../helpers/OtherHelpers";
import styles from '../../styles/GameOverScreen';

import CardInterface from "../../interfaces/CardInterface";
import RulesInterface from "../../interfaces/RulesInterface";
import CardObjectInterface from "../../interfaces/CardObjectInterface";
import { cardClubEvents, rareCardsQuest } from "../../helpers/ExploreModeHelpers";
import { NpcsInterface } from "../../interfaces/NpcsInterface";
import Texts from "../../constants/Texts";
import GameOptionsInterface from "../../interfaces/GameOptionsInterface";

const GameOverScreen = (props: {
  navigation: any
  route: any
  rules: RulesInterface
  playerCards: { [card: string]: number }
  events: { [event: string]: boolean }
  npcs: NpcsInterface
  preLoadedSounds: any
  gameOptions: GameOptionsInterface
  addCardToNPC: (data: { npc: string, card: number, location: string }) => void
  removeCardFromNPC: (data: { npc: string, card: number, location: string }) => void
  changeNPCStreak: (data: { npc: string, streak: 'win' | 'loose' | 'tie', location: string }) => void
  addCardToExploreDeck: (cardId: number) => void
  removeCardFromExploreDeck: (cardId: number) => void
  changeEvent: (event: string) => void,
  changeCardQueenPlace: (place: string) => void
  addSpecialCardQueen: (card: number) => void
  removeSpecialCardQueen: (card: number) => void
  changeCardQueenStreak: (streak: 'win' | 'loose' | 'tie') => void
}) => {
  const {
    navigation,
    route,
    rules,
    playerCards,
    events,
    npcs,
    preLoadedSounds,
    gameOptions,
    addCardToNPC,
    removeCardFromNPC,
    changeNPCStreak,
    addCardToExploreDeck,
    removeCardFromExploreDeck,
    changeEvent,
    changeCardQueenPlace,
    addSpecialCardQueen,
    removeSpecialCardQueen,
    changeCardQueenStreak
  } = props

  const { gameOver, npcDeck, location, npc, p1InitialCards } = route.params
  const { resetTable, resetCards, createCard, cards, cardsOnTheTable } = useContext(GameContext)
  const [visible, setVisible] = useState(false);
  const [modalCard, setModalCard] = useState(1);
  const [cardOwner, setCardOwner] = useState('player0');
  const [texts] = useState(Texts[(gameOptions.language as 'eng' | 'ptbr')])
  const cardClub = [
    'CC Jack',
    'CC Magician Joker',
    'CC Knight Club',
    'CC Princess Diamond',
    'CC Prince Spade',
    'CC Queen of Heart - Xu',
    'Dr. Kadowaki',
    'CC Master King - Quistis'
  ]

  // useFocusEffect(
  //   useCallback(() => {
  //     let music: any = null;

  //     const loadMusic = async () => {
  //       const theme = gameOver === 'win' ? winTheme : looseTheme
  //       Audio.Sound.createAsync(theme).then(({ sound }) => {
  //         music = sound
  //         music.playAsync()
  //         music.setIsLoopingAsync(true)
  //       })
  //     }

  //     loadMusic()

  //     return () => music.unloadAsync();
  //   }, []),
  // );

  const resetGame = () => {
    resetTable();
    resetCards();

    let newCards = getRandomCards();
    newCards.forEach((card, index) => {
      createCard(true, { id: card, row: 3 + index, column: 3, dragable: true });
    });

    newCards = getRandomCards();
    newCards.forEach((card, index) => {
      createCard(false, { id: card, row: 3 + index, column: 3, dragable: true });
    });
  };

  const sudenDeathGame = () => {
    resetTable();
    const allCards = getCardsId([...cards.play1Cards, ...cards.play2Cards]);
    resetCards();

    allCards.newP1Cards.forEach((card: CardInterface, index: number) => {
      createCard(true, { id: card, row: 3 + index, column: 3, dragable: true });
    });

    allCards.newP2Cards.forEach((card: CardInterface, index: number) => {
      createCard(false, { id: card, row: 3 + index, column: 3, dragable: true });
    });

    navigation.goBack(null);
    navigation.push('GamePlay', { screen: 'GamePlay', params: { npcDeck, location, npc } });
  };

  if (rules[location].sudenDeath && gameOver === 'tie' && cardsOnTheTable() === 9) {
    setTimeout(() => sudenDeathGame(), 2000);
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={Images.board} />
        <Image style={styles.gameOverImage} source={Images[gameOver]} />
        <Text style={styles.suddenDeathText}>{texts.suddenDeath}</Text>
      </View>
    );
  }

  if (npcDeck && location !== 'random') {
    const winCard = (cardId: number) => {
      if (npc === 'Card Queen') {
        if (cardId === 48 || cardId > 77) removeSpecialCardQueen(cardId)
        changeCardQueenStreak('win')
      } else{
        const newLocation = cardClub.includes(npc) ? 'cardClub' : location

        if (cardId === 48 || cardId > 77) removeCardFromNPC({ location: newLocation, npc, card: cardId });
        changeNPCStreak({ location: newLocation, npc, streak: 'win' });
      }
      setModalCard(cardId);
      addCardToExploreDeck(cardId);
      setCardOwner('player2');
      setVisible(true);
      const myPlace = places.find(place => place[1] === location) as any[];
      setTimeout(() => {
        setCardOwner('player1');
        preLoadedSounds.cardSound.playAsync();
        setTimeout(() => {
          setVisible(false);
          navigation.pop();
          navigation.push('Explore Scenes', {
            place: myPlace[1], image: myPlace[2], audio: myPlace[3]
          });
          cardClubEvents(events, changeEvent, npc, npcs, addCardToNPC, texts);
        }, 500);
      }, 1000);
    };

    const looseCard = (cardId: number) => {
      if (cardId === 48 || cardId > 77) {
        rareCardsQuest(
          npc, cardId, location, events, changeEvent, addCardToNPC, changeCardQueenPlace, texts
        );
      }
      if (npc === 'Card Queen') changeCardQueenStreak('loose')
      else {
        const newLocation = cardClub.includes(npc) ? 'cardClub' : location
        changeNPCStreak({ location: newLocation, npc, streak: 'loose' });
      }
      removeCardFromExploreDeck(cardId);
      setModalCard(cardId);
      setCardOwner('player1');
      setVisible(true);
      const myPlace = places.find(p => p[1] === location) as any[];
      setTimeout(() => {
        setCardOwner('player2');
        preLoadedSounds.cardSound.playAsync();
        setTimeout(() => {
          setVisible(false);
          navigation.pop();
          navigation.push('Explore Scenes', {
            place: myPlace[1], image: myPlace[2], audio: myPlace[3],
          });
        }, 1000);
      }, 1000);
    };

    const getCardName = (name: string, cardId: number) => {
      let nameStyle = styles.chooseCardNameWhite;
      if (playerCards[cardId] !== undefined) {
        if (playerCards[cardId] === 0) nameStyle = styles.chooseCardNameYellow;
      } else nameStyle = styles.chooseCardNameBlue;
      return <Text style={nameStyle}>{name}</Text>;
    };

    const loadCard = (cardId: number, player: boolean, index: number) => {
      const newCard = Cards.find(crd => crd.id === cardId) as CardObjectInterface;
      const thisPlayer = player ? 'player1' : 'player2';
      if (player) {
        return (
          <View key={JSON.stringify([cardId, player, index])}>
            {getCardName(newCard.name, newCard.id)}
            <View style={styles.chooseCardImage}>
              <Image style={styles.insideChooseCard} source={Images[thisPlayer]} />
              <Image style={styles.insideChooseCard} source={Images[newCard.id]} />
              <RankNumbers
                ranks={newCard.ranks}
                element={newCard.element}
                playCard={{ row: 8, column: 8, dragable: false }}
                player0={false}
              />
            </View>
          </View>
        );
      }

      return (
        <View key={JSON.stringify([cardId, player, index])}>
          {getCardName(newCard.name, newCard.id)}
          <TouchableOpacity style={styles.chooseCardImage} onPress={() => winCard(cardId)}>
            <Image style={styles.insideChooseCard} source={Images[thisPlayer]} />
            <Image style={styles.insideChooseCard} source={Images[newCard.id]} />
            <RankNumbers
              ranks={newCard.ranks}
              element={newCard.element}
              playCard={{ row: 8, column: 8, dragable: false }}
              player0={false}
            />
          </TouchableOpacity>
        </View>
      );
    };

    if (gameOver === 'win') {
      return (
        <View style={styles.container}>
          <CardModal visible={visible} cardId={modalCard} cardOwner={cardOwner} />
          <Image style={styles.backgroundImage} source={Images.board} />
          <Image style={styles.gameOverImage} source={Images[gameOver]} />
          <Text style={styles.text}>{texts.chooseOneCard}</Text>
          <View style={styles.chooseCardContainer}>
            {npcDeck.map((thisCard: number, index: number) => loadCard(thisCard, false, index))}
          </View>
        </View>
      );
    }

    if (gameOver === 'loose') {
      return (
        <View style={styles.container}>
          <CardModal visible={visible} cardId={modalCard} cardOwner={cardOwner} />
          <Image style={styles.backgroundImage} source={Images.board} />
          <Image style={styles.gameOverImage} source={Images[gameOver]} />
          <Text style={styles.text}>{texts.cardWillBeChoosen}</Text>
          <View style={styles.chooseCardContainer}>
            {p1InitialCards.map((thisCard: number, index: number) => loadCard(thisCard, true, index))}
          </View>
          <Button
            title={texts.goBack}
            onPress={() => looseCard(Math.max(...p1InitialCards))}
          />
        </View>
      );
    }

    if (gameOver === 'tie') {
      return (
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={Images.board} />
          <View style={styles.topContainer}>
            <Image style={styles.tieImage} source={Images[gameOver]} />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title={texts.goBack}
              onPress={() => {
                const myPlace = places.find(p => p[1] === location) as any[];
                if (npc === 'cardQueen') changeCardQueenStreak('tie')
                else {
                  const newLocation = cardClub.includes(npc) ? 'cardClub' : location
                  changeNPCStreak({ location: newLocation, npc, streak: 'tie' });
                }
                navigation.pop();
                navigation.push('Explore Scenes', {
                  place: myPlace[1], image: myPlace[2], audio: myPlace[3]
                });
              }}
            />
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={Images.board} />
      <Image style={styles.gameOverImage} source={Images[gameOver]} />
      <View style={styles.buttonsContainer}>
        <Button
          title={texts.newRandomGame}
          onPress={() => {
            resetGame();
            navigation.pop();
            navigation.push('GamePlay', { screen: 'GamePlay', params: { npcDeck, location, npc } });
          }}
        />
        <Button
          title={texts.backInitialScreen}
          onPress={() => {
            resetGame();
            navigation.pop();
            navigation.push('Initial Screen')
          }}
        />
      </View>
    </View>
  );
}

export default GameOverScreen;
