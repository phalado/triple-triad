/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Table from './Table';
import PlayingTexts from './PlayingTexts';
import Card from './Card';
import Cards from '../constants/Cards';
import CardCombat from '../Helpers/CardCombatLogic';
import styles from '../styles/GamePlay';

const GamePlay = props => {
  const { route } = props;
  const [table, setTable] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [playCards, setPlayCards] = useState({
    play1Cards: route.params.play1Cards,
    play2Cards: route.params.play2Cards,
  });
  const [gameOver, setGameOver] = useState(false);
  // const gameMusic = new Sound('gameSound.mp3', Sound.MAIN_BUNDLE);
  // gameMusic.setNumberOfLoops(-1);

  const handlePlaceCard = (card, tble, row, column) => {
    const newProps = CardCombat({
      card,
      table: tble,
      row,
      column,
      player: tble[row][column][1],
      play1Cards: playCards.play1Cards,
      play2Cards: playCards.play2Cards,
    });
    playCards.play1Cards = newProps.play1Cards;
    playCards.play2Cards = newProps.play2Cards;
    setTable(newProps.table);
    setPlayCards({
      play1Cards: newProps.play1Cards,
      play2Cards: newProps.play2Cards,
    });
    if (table.every(value => value.every(v => v !== null))) setGameOver(true);
  };

  return (
    <View style={styles.container}>
      <Table />
      <PlayingTexts player score={playCards.play1Cards.length} />
      <PlayingTexts score={playCards.play2Cards.length} />
      {/* {gameMusic.play()} */}
      {playCards.play1Cards.map(playCard => (
        <Card
          card={Cards.find(card => card.id === playCard.id)}
          row={playCard.row}
          column={playCard.column}
          player
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          dragable={playCard.dragable}
          key={[playCard.id, playCard.row, playCard.column, true]}
        />
      ))}
      {playCards.play2Cards.map(playCard => (
        <Card
          card={Cards.find(card => card.id === playCard.id)}
          row={playCard.row}
          column={playCard.column}
          table={table}
          handlePlaceCard={handlePlaceCard}
          gameOver={gameOver}
          dragable={playCard.dragable}
          key={[playCard.id, playCard.row, playCard.column, false]}
        />
      ))}
    </View>
  );
};

GamePlay.propTypes = {
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GamePlay;
