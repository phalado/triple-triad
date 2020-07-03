/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { cardsOnTheTable } from '../Helpers/OtherHelpers';
import Images from '../constants/Images';
import styles from '../styles/PlayingCards';

const PlayingTexts = props => {
  const {
    player, score, table, turn,
  } = props;
  let [myTurn] = useState(turn);
  const contStyle = player
    ? { ...styles.container, ...styles.play1 }
    : { ...styles.container, ...styles.play2 };

  const myColor = player ? 'blue' : 'red';
  myTurn = cardsOnTheTable(table) % 2 === 1 ? !turn : turn;

  const getTurnImage = () => {
    if (player && myTurn) {
      return (
        <Image
          style={styles.cursorR}
          source={Images.turn1}
          alt="Cursor"
        />
      );
    }

    if (!player && !myTurn) {
      return (
        <Image
          style={styles.cursorL}
          source={Images.turn2}
          alt="Cursor"
        />
      );
    }

    return null;
  };

  return (
    <View style={contStyle}>
      <Text style={{ ...styles.nameText, color: myColor }}>
        {player ? 'Player 1' : 'PC'}
      </Text>
      {getTurnImage()}
      <Text style={{ ...styles.scoreText, color: myColor }}>
        Score:
        {' '}
        {score}
      </Text>
    </View>
  );
};

PlayingTexts.propTypes = {
  player: PropTypes.bool,
  score: PropTypes.number.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  turn: PropTypes.bool.isRequired,
};

PlayingTexts.defaultProps = {
  player: false,
};

export default PlayingTexts;
