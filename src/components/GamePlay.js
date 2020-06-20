import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Table from './Table';
import PlayingCards from './PlayingCards';
import Card from './Card';
import Cards from '../constants/Cards';
import styles from '../styles/GamePlay';

const GamePlay = props => {
  const { route } = props;
  const { play1Cards, play2Cards } = route.params;
  const table = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
  return (
    <View style={styles.container}>
      <Table />
      <PlayingCards player />
      <PlayingCards />
      {play1Cards.map((playCard, index) => (
        <Card
          card={Cards.find(card => card.id === playCard)}
          row={index + 2}
          column={2}
          player
          table={table}
          key={playCard}
        />
      ))}
      {play2Cards.map((playCard, index) => (
        <Card
          card={Cards.find(card => card.id === playCard)}
          row={index + 2}
          column={2}
          table={table}
          key={playCard}
        />
      ))}
    </View>
  );
};

GamePlay.propTypes = {
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GamePlay;
