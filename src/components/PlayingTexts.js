/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/PlayingCards';

const PlayingTexts = props => {
  const { player, score } = props;
  const contStyle = player
    ? { ...styles.container, ...styles.play1 }
    : { ...styles.container, ...styles.play2 };

  const myColor = player ? 'blue' : 'red';

  return (
    <View style={contStyle}>
      <Text style={{ ...styles.nameText, color: myColor }}>
        {player ? 'Player 1' : 'PC'}
      </Text>
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
};

PlayingTexts.defaultProps = {
  player: false,
};

export default PlayingTexts;
