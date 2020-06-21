import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Table from './Table';
import PlayingTexts from './PlayingTexts';
import Card from './Card';
import Cards from '../constants/Cards';
import styles from '../styles/GamePlay';

const GamePlay = props => {
  const { route } = props;
  // const { play1Cards, play2Cards } = route.params;
  const [table, setTable] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [play1Cards, setPlay1Cards] = useState(route.params.play1Cards);
  const [play2Cards, setPlay2Cards] = useState(route.params.play2Cards);

  const handlePlaceCard = (card, tble, row, column) => {
    setTable(tble);
    if (column === 0) return;
    if (table[row][column - 1] !== null) {
      const otherCard = table[row][column - 1][0];
      if (!table[row][column - 1][1] && card.ranks[1] > otherCard.ranks[3]) {
        table[row][column - 1][1] = true;
        setPlay1Cards([
          ...play1Cards.filter(c => c.id !== card.id),
          {
            id: card.id,
            row,
            column,
          },
          {
            id: otherCard.id,
            row,
            column: column - 1,
          },
        ]);
        setPlay2Cards(play2Cards.filter(card => card.id !== otherCard.id));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Table />
      <PlayingTexts player score={play1Cards.length} />
      <PlayingTexts score={play2Cards.length} />
      {play1Cards.map(playCard => (
        <Card
          card={Cards.find(card => card.id === playCard.id)}
          row={playCard.row}
          column={playCard.column}
          player
          table={table}
          handlePlaceCard={handlePlaceCard}
          key={playCard.id}
        />
      ))}
      {play2Cards.map(playCard => (
        <Card
          card={Cards.find(card => card.id === playCard.id)}
          row={playCard.row}
          column={playCard.column}
          table={table}
          handlePlaceCard={handlePlaceCard}
          key={playCard.id}
        />
      ))}
    </View>
  );
};

GamePlay.propTypes = {
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GamePlay;
