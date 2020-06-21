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
  // const { play1Cards, play2Cards } = route.params;
  const [table, setTable] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [play1Cards, setPlay1Cards] = useState(route.params.play1Cards);
  const [play2Cards, setPlay2Cards] = useState(route.params.play2Cards);

  const handlePlaceCard = (card, tble, row, column) => {
    const newProps = CardCombat({
      card,
      table: tble,
      row,
      column,
      player: tble[row][column][1],
      play1Cards,
      play2Cards,
    });
    setTable(newProps.table);
    setPlay1Cards(newProps.play1Cards);
    setPlay2Cards(newProps.play2Cards);
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
          key={[playCard.id, playCard.row, playCard.column, true]}
        />
      ))}
      {play2Cards.map(playCard => (
        <Card
          card={Cards.find(card => card.id === playCard.id)}
          row={playCard.row}
          column={playCard.column}
          table={table}
          handlePlaceCard={handlePlaceCard}
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
