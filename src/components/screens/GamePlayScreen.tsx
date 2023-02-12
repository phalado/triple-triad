import React, { useCallback, useContext, useEffect, useState } from "react";
import { BackHandler, LogBox, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { GameContext } from "../GameContext";

import Table from "../Table";
import AnimatedCard from "../AnimatedCards";
import PlayingTexts from "../PlayingTexts";
import PlayerTurnModal from "../modals/PlayerTurnModal";

import Cards from "../../constants/Cards";
import { resetGame } from "../../helpers/OtherHelpers";
import { cardCombat, checkPlus, checkSame } from "../../helpers/CardCombatLogic";
import PCMovement from "../../helpers/PCMovement";
import styles from '../../styles/GamePlay';

import CardInterface from "../../interfaces/CardInterface";
import RulesInterface from "../../interfaces/RulesInterface";
import { NpcsInterface } from "../../interfaces/NpcsInterface";
import CardObjectInterface from "../../interfaces/CardObjectInterface";
import PreLoadedSoundsInterface from "../../interfaces/PreLoadedSounds";
import PlaceRules from "../../constants/PlaceRules";

LogBox.ignoreLogs([
  'Found screens with the same name nested inside one another.',
]);

const GamePlayScreen = (
  props: {
    rules: RulesInterface,
    npcs: NpcsInterface,
    preLoadedSounds: PreLoadedSoundsInterface,
    navigation: any,
    route: any
  }
) => {
  const { rules, npcs, preLoadedSounds, navigation, route } = props;

  const {
    table,
    cards,
    resetTable,
    cardsOnTheTable,
    cloneTable,
    createCard,
    resetCards,
    placeCard,
    existCard,
    turn,
    setTurn
  } = useContext(GameContext)

  let [gameOver, setGameOver] = useState<boolean | 'tie' | 'win' | 'loose'>(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalValue, setModalValue] = useState('none');
  const { npcDeck, location, npc } = route.params //? route.params
    // : { npcDeck: null, location: null, npc: null, gameMusic: null };
  const [p1InitialCards] = useState(cards.player1Cards.map((card: CardInterface) => card.id));
  // const rules = PlaceRules

  useFocusEffect(
    useCallback(() => {
      preLoadedSounds.gameMusic.playAsync()
      preLoadedSounds.gameMusic.setIsLoopingAsync(true)

      const onBackPress = () => {
        resetGame({ resetCards, resetTable, createCard, navigation });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        preLoadedSounds.gameMusic.unloadAsync()
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    }, []),
  )

  const callGameOverWindow = (gameOver: boolean | 'win' | 'loose' | 'tie') => {
    navigation.pop();
    navigation.navigate('Game over', {
      gameOver, npcDeck, location, npc, p1InitialCards,
    });
  };

  const showModalWindow = (value?: string) => {
    setVisibleModal(true);
    if (value) setModalValue(value);
    setTimeout(() => setVisibleModal(false), 1000);
  };

  const changeMove = (movement: {
    oldRow: number, oldColumn: number, card: CardObjectInterface, row: number, column: number
  }) => {
    const { oldRow, oldColumn, card, row, column } = movement;
    handlePlaceCard(false, card, oldRow, oldColumn, row, column);
  };

  const handlePlaceCard = (
    player: boolean,
    card: CardObjectInterface,
    oldRow: number,
    oldColumn: number,
    row: number,
    column: number
  ) => {
    placeCard(player, card, oldRow, oldColumn, row, column)

    const newProps = {
      card,
      table,
      element: table[row][column].element,
      player,
      rules: rules[location],
      placeCard,
      preLoadedSounds,
      existCard,
      cardsOnTheTable
    };

    if(rules[location].same) checkSame(newProps, row, column, showModalWindow);
    if(rules[location].plus) checkPlus(newProps, row, column, showModalWindow);

    if (existCard(row - 1, column)) cardCombat(newProps, row - 1, column, 0, 3);
    if (existCard(row + 1, column)) cardCombat(newProps, row + 1, column, 3, 0);
    if (existCard(row, column - 1)) cardCombat(newProps, row, column - 1, 1, 2);
    if (existCard(row, column + 1)) cardCombat(newProps, row, column + 1, 2, 1);

    if (cardsOnTheTable < 9) showModalWindow();
    setTurn(false)
  };

  useEffect(() => {
    if (cardsOnTheTable === 9) {
      if (cards.player1Cards.length > cards.player2Cards.length) setGameOver('win');
      else if (cards.player1Cards.length < cards.player2Cards.length) setGameOver('loose');
      else setGameOver('tie');
      setTimeout(() => callGameOverWindow(gameOver), 1500);
      return
    }

    if (turn) {
      showModalWindow('none');
      return
    }

    if (turn === false) {
      setTimeout(() => {
        changeMove(PCMovement({ cards, rules: rules[location], table, cloneTable, cardsOnTheTable }));
        setTurn(true)
      }, 1000);
    }
  }, [turn]);

  const cc = ['jack', 'joker', 'club', 'diamond', 'spade', 'heart', 'king'];
  const newLocation = cc.includes(npc) ? 'cardClub' : location;

  return (
    <View style={styles.container}>
      <Table elemental={rules[location].elemental} navigation={navigation} />
      <PlayingTexts player score={cards.player1Cards.length} />
      <PlayingTexts
        NPCName={npc === 'Card Queen' ? npc : npcs[newLocation][npc].name}
        score={cards.player2Cards.length}
      />
      <PlayerTurnModal visible={visibleModal} value={modalValue} />
      {cards.player1Cards.map((playCard: CardInterface) => (
        <AnimatedCard
          card={Cards.find(card => card.id === playCard.id) as CardObjectInterface}
          playCard={playCard}
          player
          gameOver={gameOver}
          rules={rules[location]}
          preLoadedSounds={preLoadedSounds}
          handlePlaceCard={handlePlaceCard}
          key={JSON.stringify([playCard.id, playCard.row, playCard.column, true])}
        />
      ))}
      {cards.player2Cards.map((playCard: CardInterface) => (
        <AnimatedCard
          card={Cards.find(card => card.id === playCard.id) as CardObjectInterface}
          playCard={playCard}
          player={false}
          gameOver={gameOver}
          rules={rules[location]}
          preLoadedSounds={preLoadedSounds}
          handlePlaceCard={handlePlaceCard}
          key={JSON.stringify([playCard.id, playCard.row, playCard.column, false])}
        />
      ))}
    </View>
  )
}

export default GamePlayScreen;
