import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, LogBox, View } from "react-native";
import { cardsOnTheTable, getRandomBoolean, resetGame } from "../../helpers/OtherHelpers";
import CardInterface from "../../interfaces/CardInterface";
import { Audio } from 'expo-av';
import { gameTheme, cardTurn, special } from "../../constants/Sounds";
import { cardCombat, checkPlus, checkSame } from "../../helpers/CardCombatLogic";
import styles from '../../styles/GamePlay';
import Cards from "../../constants/Cards";
import Table from "../Table";
import PCMovement from "../../helpers/PCMovement";
import PlayingTexts from "../PlayingTexts";
import PlayerTurnModal from "../modals/PlayerTurnModal";
import TableInterface from "../../interfaces/TableInterface";
import RulesInterface from "../../interfaces/RulesInterface";
import { NpcsInterface } from "../../interfaces/NpcsInterface";
import AnimatedCard from "../AnimatedCards";

LogBox.ignoreLogs([
  'Found screens with the same name nested inside one another.',
]);

const GamePlayScreen = (
  props: {
    cards: any,
    table: TableInterface,
    rules: RulesInterface,
    npcs: NpcsInterface,
    modifyTable: (table: TableInterface) => void,
    createCard: (player: boolean, card: CardInterface) => void,
    removeCard: (player: boolean, row: number, column: number) => void,
    resetCards: () => void,
    resetTable: () => void,
    navigation: any,
    route: any
  }
) => {
  const {
    cards,
    table,
    rules,
    npcs,
    modifyTable,
    createCard,
    removeCard,
    resetCards,
    resetTable,
    navigation,
    route
  } = props;
  let [gameOver] = useState<boolean | 'tie' | 'win' | 'loose'>(false);
  const [pCards] = useState(cards);
  const [myTurn] = useState(getRandomBoolean());
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalValue, setModalValue] = useState('none');
  const { npcDeck, location, npc } = route.params ? route.params
    : { npcDeck: null, location: null, npc: null };
  const [p1InitialCards] = useState(cards.player1Cards.map((card: CardInterface) => card.id));
  const [turnCardSound, setTurnCardSound] = useState<any>()
  const [specialSound, setSpecialSound] = useState<any>()

  useFocusEffect(
    useCallback(() => {
      let music: any = null;

      const setMusic = async () => {
        Audio.Sound.createAsync(gameTheme).then(({ sound }) => {
          music = sound
          music.playAsync()
          music.setIsLoopingAsync(true)
        })
      }

      setMusic()

      const onBackPress = () => {
        resetGame({ resetCards, resetTable, createCard, navigation });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        console.log(music)
        music.unloadAsync()
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    }, []),
  )

  useEffect(() => {
    const setSound = async () => {
      await Audio.Sound.createAsync(cardTurn).then(({ sound }) => setTurnCardSound(sound))
      await Audio.Sound.createAsync(special).then(({ sound }) => setSpecialSound(sound))
    }

    setSound()
  }, [])

  const callGameOverWindow = (gameOver: boolean | 'win' | 'loose' | 'tie') => {
    navigation.pop();
    navigation.navigate('Game over', {
      gameOver, npcDeck, location, npc, p1InitialCards,
    });
  };

  const handleAddCard = (
    data: { player: boolean, id: number, row: number, column: number, dragable: boolean }
  ) => {
    const { player, id, row, column, dragable } = data

    if (player) pCards.player1Cards = [...pCards.player1Cards, { id, row, column, dragable }];
    else pCards.player2Cards = [...pCards.player2Cards, { id, row, column, dragable }];

    createCard(player, data);
  };

  const handleRemoveCard = (
    data: { player: boolean | any, row: number, column: number }
  ) => {
    const { player, row, column } = data;

    if (player) pCards.player1Cards = pCards.player1Cards.filter((c: any) => (
        c.row !== row || c.column !== column
      ));
    else pCards.player2Cards = pCards.player2Cards.filter((c: any) => (
        c.row !== row || c.column !== column
      ))

    removeCard(player, row, column);
  };

  const handleChangeTable = (table: any) => modifyTable(table);

  const showModalWindow = (value?: string) => {
    setVisibleModal(true);
    if (value) setModalValue(value);
    setTimeout(() => setVisibleModal(false), 1000);
  };

  const changeMove = (movement: any) => {
    const {
      oldRow, oldColumn, card, row, column,
    } = movement;
    table[row][column] = { card, player: false, element: table[row][column].element };
    handlePlaceCard(card, oldRow, oldColumn, table, row, column);
  };

  const handlePlaceCard = (
    card: CardInterface, oldRow: number, oldColumn: number, tble: any, row: number, column: number
  ) => {
    modifyTable(tble);
    handleRemoveCard({ player: tble[row][column][1], row: oldRow, column: oldColumn });
    handleAddCard({ player: tble[row][column][1], id: card.id as number, row, column, dragable: false });

    const newProps = {
      card,
      table: tble,
      element: table[row][column].element,
      player: tble[row][column][1],
      rules: rules[location],
      handleAddCard,
      handleRemoveCard,
      handleChangeTable,
      turnCardSound,
      specialSound
    };

    checkSame(newProps, row, column, showModalWindow);
    checkPlus(newProps, row, column, showModalWindow);

    if (row > 0 && !!table[row - 1][column].card) cardCombat(newProps, row - 1, column, 0, 3);
    if (row < 2 && !!table[row + 1][column].card) cardCombat(newProps, row + 1, column, 3, 0);
    if (column > 0 && !!table[row][column - 1].card) cardCombat(newProps, row, column - 1, 1, 2);
    if (column < 2 && !!table[row][column + 1].card) cardCombat(newProps, row, column + 1, 2, 1);

    if (cardsOnTheTable(table) < 9) showModalWindow();
    if (tble[row][column][1] && cardsOnTheTable(table) < 9) {
      setTimeout(() => {
        changeMove(PCMovement({ table, cards, rules: rules[location] }));
      }, 1000);
    }
    if (cardsOnTheTable(table) === 9) {
      if (pCards.player1Cards.length > pCards.player2Cards.length) gameOver = 'win';
      else if (pCards.player1Cards.length < pCards.player2Cards.length) gameOver = 'loose';
      else gameOver = 'tie';
      setTimeout(() => callGameOverWindow(gameOver), 1500);
    }
  };

  useEffect(() => {
    if (myTurn) showModalWindow('none');

    if ((!myTurn && cardsOnTheTable(table) % 2 === 0) || (myTurn && cardsOnTheTable(table) % 2 === 1)) {
      return changeMove(PCMovement({ table, cards, rules: rules[location] }));
    }
  }, []);

  const cc = ['jack', 'joker', 'club', 'diamond', 'spade', 'heart', 'king'];
  const newLocation = cc.includes(npc) ? 'cardClub' : location;

  return (
    <View style={styles.container}>
      <Table elemental={rules[location].elemental} navigation={navigation} />
      <PlayingTexts player score={pCards.player1Cards.length} table={table} turn={myTurn} />
      <PlayingTexts
        NPCName={npc === 'Card Queen' ? npc : npcs[newLocation][npc].name}
        score={pCards.player2Cards.length}
        table={table}
        turn={myTurn}
      />
      <PlayerTurnModal
        table={table}
        visible={visibleModal}
        turn={myTurn}
        value={modalValue}
      />
      {pCards.player1Cards.map((playCard: CardInterface) => (
        <AnimatedCard
          card={Cards.find(card => card.id === playCard.id)}
          playCard={playCard}
          player
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          turn={myTurn}
          rules={rules[location]}
          key={JSON.stringify([playCard.id, playCard.row, playCard.column, true])}
        />
      ))}
      {pCards.player2Cards.map((playCard: CardInterface) => (
        <AnimatedCard
          card={Cards.find(card => card.id === playCard.id)}
          playCard={playCard}
          player={false}
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          turn={myTurn}
          rules={rules[location]}
          key={JSON.stringify([playCard.id, playCard.row, playCard.column, false])}
        />
      ))}
    </View>
  )
}

export default GamePlayScreen;
