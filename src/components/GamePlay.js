import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Table from './Table';
import PlayingTexts from './PlayingTexts';
import Card from './Card';
import Cards from '../constants/Cards';
import CardCombat from '../Helpers/CardCombatLogic';
import { getRandomBoolean } from '../Helpers/OtherHelpers';
import styles from '../styles/GamePlay';

const GamePlay = props => {
  const {
    cards, table, modifyTable, addCard, removeCard,
  } = props;
  const [gameOver, setGameOver] = useState(false);
  const [pCards] = useState(cards);
  const [myTurn] = useState(getRandomBoolean());
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
    if (data.player) {
      const removable = pCards.play1Cards.find(c => c.id === data.id);
      pCards.play1Cards = pCards.play1Cards.filter(c => c !== removable);
    } else {
      const removable = pCards.play2Cards.find(c => c.id === data.id);
      pCards.play2Cards = pCards.play2Cards.filter(c => c !== removable);
    }
    removeCard(data);
  };

  const handleChangeTable = table => {
    modifyTable(table);
  };

  const handlePlaceCard = (card, tble, row, column) => {
    modifyTable(tble);
    handleRemoveCard({ player: tble[row][column][1], id: card.id });
    handleAddCard({
      player: tble[row][column][1], id: card.id, row, column, dragable: false,
    });

    const newProps = {
      card,
      table: tble,
      player: tble[row][column][1],
      handleAddCard,
      handleRemoveCard,
      handleChangeTable,
    };

    if (row > 0 && !!table[row - 1][column]) CardCombat(newProps, row - 1, column, 0, 2);
    if (row < 2 && !!table[row + 1][column]) CardCombat(newProps, row + 1, column, 2, 0);
    if (column > 0 && !!table[row][column - 1]) CardCombat(newProps, row, column - 1, 1, 3);
    if (column < 2 && !!table[row][column + 1]) CardCombat(newProps, row, column + 1, 3, 1);

    if (table.every(value => value.every(v => v !== null))) setGameOver(true);
  };

  return (
    <View style={styles.container}>
      <Table />
      <PlayingTexts player score={pCards.play1Cards.length} />
      <PlayingTexts score={pCards.play2Cards.length} />
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
};

export default GamePlay;
