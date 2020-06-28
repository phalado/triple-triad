import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Table from './Table';
import PlayingTexts from './PlayingTexts';
import Card from './Card';
import Cards from '../constants/Cards';
import { CardCombat, checkSamePlus } from '../Helpers/CardCombatLogic';
import { getRandomBoolean, cardsOnTheTable } from '../Helpers/OtherHelpers';
import ChangeTurnModal from '../container/ChangeTurnModal';
import styles from '../styles/GamePlay';

const GamePlay = props => {
  const {
    cards, table, modifyTable, addCard, removeCard, navigation,
  } = props;
  const [gameOver, setGameOver] = useState(false);
  const [pCards] = useState(cards);
  const [myTurn] = useState(getRandomBoolean());
  const [visibleModal, setVisibleModal] = useState(false);
  // const gameMusic = new S ound('gameSound.mp3', Sound.MAIN_BUNDLE);
  // gameMusic.setNumberOfLoops(-1);

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
    addCard(data);
  };

  const handleRemoveCard = data => {
    const { id, row, column } = data;
    if (row) {
      if (data.player) {
        const removable = pCards.play1Cards.find(c => c.row === row && c.column === column);
        console.log(removable);
        pCards.play1Cards = pCards.play1Cards.filter(c => c !== removable);
      } else {
        const removable = pCards.play2Cards.find(c => c.row === row && c.column === column);
        pCards.play2Cards = pCards.play2Cards.filter(c => c !== removable);
      }
    } else if (data.player) {
      const removable = pCards.play1Cards.find(c => c.id === id);
      console.log(removable);
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

  const showModalWindow = () => {
    setVisibleModal(true);
    if (cardsOnTheTable(table) < 9) setTimeout(() => setVisibleModal(false), 1000);
  };

  useEffect(() => showModalWindow(), []);

  const handlePlaceCard = (card, tble, row, column) => {
    console.log(card);
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
      handleAddCard,
      handleRemoveCard,
      handleChangeTable,
    };

    checkSamePlus(newProps, row, column);

    if (row > 0 && !!table[row - 1][column][0]) CardCombat(newProps, row - 1, column, 0, 2);
    if (row < 2 && !!table[row + 1][column][0]) CardCombat(newProps, row + 1, column, 2, 0);
    if (column > 0 && !!table[row][column - 1][0]) CardCombat(newProps, row, column - 1, 1, 3);
    if (column < 2 && !!table[row][column + 1][0]) CardCombat(newProps, row, column + 1, 3, 1);

    if (cardsOnTheTable(table) === 9) {
      if (pCards.play1Cards.length > pCards.play2Cards.length) setGameOver('win');
      else if (pCards.play1Cards.length < pCards.play2Cards.length) setGameOver('loose');
      else setGameOver('tie');
    }
    // handleEndOfTurn(myTurn, gameOver, pCards.play1Cards.length, table);
    showModalWindow();
  };

  return (
    <View style={styles.container}>
      <Table />
      <PlayingTexts player score={pCards.play1Cards.length} />
      <PlayingTexts score={pCards.play2Cards.length} />
      {/* {handleEndOfTurn(myTurn, gameOver, pCards.play1Cards.length, table)} */}
      <ChangeTurnModal
        visible={visibleModal}
        turn={myTurn}
        gameOver={gameOver}
        navigation={navigation}
      />
      {/* {gameMusic.play()} */}
      {pCards.play1Cards.map(playCard => (
        <Card
          card={Cards.find(card => card.id === playCard.id)}
          playCard={playCard}
          player
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          turn={myTurn}
          key={[playCard.id, playCard.row, playCard.column, true]}
        />
      ))}
      {pCards.play2Cards.map(playCard => (
        <Card
          card={Cards.find(card => card.id === playCard.id)}
          playCard={playCard}
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          turn={myTurn}
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
  modifyTable: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GamePlay;
