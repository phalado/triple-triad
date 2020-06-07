/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/PlayingCards';
import Cards from '../constants/Cards';
import Card from './Card';

const PlayingCards = props => {
  const { player, playCards } = props;
  const contStyle = player
    ? { ...styles.container, ...styles.play1 }
    : { ...styles.container, ...styles.play2 };

  return (
    <View style={contStyle}>
      <Text style={{ color: 'white', fontSize: 30 }}>Text here</Text>
      <View style={{ position: 'relative' }}>
        {playCards.map((playCard, index) => (
          <Card
            card={Cards.find(card => card.id === playCard)}
            row={index + 2}
            column={2}
            player={player ? 'player1' : 'player2'}
            key={index * playCard}
          />
        ))}
      </View>
      <Text style={styles.scoreText}>Score: 5</Text>
    </View>
  );
};

PlayingCards.propTypes = {
  player: PropTypes.bool,
  playCards: PropTypes.arrayOf(PropTypes.number).isRequired,
};

PlayingCards.defaultProps = {
  player: false,
};

export default PlayingCards;
