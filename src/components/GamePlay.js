import React, { useState, useEffect, useCallback } from 'react';
import { View, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Table from './Table';
import PlayingTexts from './PlayingTexts';
import AnimatedCard from './AnimatedCard';
import ModalScreen from '../container/ModalScreen';
import Cards from '../constants/Cards';
import { gameMusicPlay, gameMusicStop } from '../constants/Sounds';
import { cardCombat, checkSame, checkPlus } from '../Helpers/CardCombatLogic';
import { getRandomBoolean, cardsOnTheTable, resetGame } from '../Helpers/OtherHelpers';
import PCMovement from '../Helpers/PCMovement';
import styles from '../styles/GamePlay';

const GamePlay = props => {
  const {
    cards, table, rules, modifyTable, createCard, removeCard, resetCards, resetTable, navigation,
  } = props;
  const [gameOver, setGameOver] = useState(false);
  const [pCards] = useState(cards);
  // const [myTurn] = useState(false);
  const [myTurn] = useState(getRandomBoolean());
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalValue, setModalValue] = useState('none');

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        resetGame({
          resetCards, resetTable, createCard, navigation,
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      gameMusicPlay();


      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        gameMusicStop();
      };
    }, []),
  );

  const handleAddCard = data => {
    if (data.player) {
      pCards.play1Cards = [
        ...pCards.play1Cards,
        {
          id: data.id,
          row: data.row,
          column: data.column,
          dragable: data.dragable,
        },
      ];
    } else {
      pCards.play2Cards = [
        ...pCards.play2Cards,
        {
          id: data.id,
          row: data.row,
          column: data.column,
          dragable: data.dragable,
        },
      ];
    }
    createCard(data);
  };

  const handleRemoveCard = data => {
    const { id, row, column } = data;
    if (row) {
      if (data.player) {
        const removable = pCards.play1Cards.find(c => c.row === row && c.column === column);
        pCards.play1Cards = pCards.play1Cards.filter(c => c !== removable);
      } else {
        const removable = pCards.play2Cards.find(c => c.row === row && c.column === column);
        pCards.play2Cards = pCards.play2Cards.filter(c => c !== removable);
      }
    } else if (data.player) {
      const removable = pCards.play1Cards.find(c => c.id === id);
      pCards.play1Cards = pCards.play1Cards.filter(c => c !== removable);
    } else {
      const removable = pCards.play2Cards.find(c => c.id === id);
      pCards.play2Cards = pCards.play2Cards.filter(c => c !== removable);
    }
    removeCard(data);
  };

  const handleChangeTable = table => {
    modifyTable(table);
  };

  const showModalWindow = value => {
    if (cardsOnTheTable(table) < 9) setGameOver(false);
    setVisibleModal(true);
    if (value) setModalValue(value);
    if (cardsOnTheTable(table) < 9) {
      setTimeout(() => {
        setVisibleModal(false);
        setModalValue('none');
      }, 1000);
    } else if (value) {
      setTimeout(() => {
        setVisibleModal(false);
        setModalValue('none');
      }, 1000);
    }
  };

  const handlePlaceCard = (card, tble, row, column) => {
    modifyTable(tble);
    handleRemoveCard({
      player: tble[row][column][1], id: card.id, row: card.row, column: card.column,
    });
    handleAddCard({
      player: tble[row][column][1], id: card.id, row, column, dragable: false,
    });

    const newProps = {
      card,
      table: tble,
      element: table[row][column][2],
      player: tble[row][column][1],
      rules,
      handleAddCard,
      handleRemoveCard,
      handleChangeTable,
    };

    checkSame(newProps, row, column, showModalWindow);
    checkPlus(newProps, row, column, showModalWindow);

    if (row > 0 && !!table[row - 1][column][0]) cardCombat(newProps, row - 1, column, 0, 3);
    if (row < 2 && !!table[row + 1][column][0]) cardCombat(newProps, row + 1, column, 3, 0);
    if (column > 0 && !!table[row][column - 1][0]) cardCombat(newProps, row, column - 1, 1, 2);
    if (column < 2 && !!table[row][column + 1][0]) cardCombat(newProps, row, column + 1, 2, 1);

    if (cardsOnTheTable(table) === 9) {
      if (pCards.play1Cards.length > pCards.play2Cards.length) setGameOver('win');
      else if (pCards.play1Cards.length < pCards.play2Cards.length) setGameOver('loose');
      else setGameOver('tie');
    }
    showModalWindow();
    if (tble[row][column][1] && cardsOnTheTable(table) < 9) {
      setTimeout(() => {
        // eslint-disable-next-line no-use-before-define
        changeMove(PCMovement({ table, cards, rules }));
      }, 1000);
    }
  };

  const changeMove = movement => {
    const { card, row, column } = movement;
    table[row][column] = [card, false, table[row][column][2]];
    handlePlaceCard(card, table, row, column);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (myTurn) showModalWindow('none');

    if ((!myTurn && cardsOnTheTable(table) % 2 === 0) || (myTurn && cardsOnTheTable % 2 === 1)) {
      return changeMove(PCMovement({ table, cards, rules }));
    }
  }, []);


  return (
    <View style={styles.container}>
      <Table />
      <PlayingTexts player score={pCards.play1Cards.length} table={table} turn={myTurn} />
      <PlayingTexts score={pCards.play2Cards.length} table={table} turn={myTurn} />
      <ModalScreen
        visible={visibleModal}
        turn={myTurn}
        gameOver={gameOver}
        navigation={navigation}
        value={modalValue}
      />
      {pCards.play1Cards.map(playCard => (
        <AnimatedCard
          card={Cards.find(card => card.id === playCard.id)}
          playCard={playCard}
          player
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          turn={myTurn}
          rules={rules}
          key={[playCard.id, playCard.row, playCard.column, true]}
        />
      ))}
      {pCards.play2Cards.map(playCard => (
        <AnimatedCard
          card={Cards.find(card => card.id === playCard.id)}
          playCard={playCard}
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          turn={myTurn}
          rules={rules}
          key={[playCard.id, playCard.row, playCard.column, false]}
        />
      ))}
    </View>
  );
};

GamePlay.propTypes = {
  cards: PropTypes.shape({
    play1Cards: PropTypes.arrayOf(PropTypes.object),
    play2Cards: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  rules: PropTypes.objectOf(PropTypes.bool).isRequired,
  modifyTable: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GamePlay;
