import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import Images from "../constants/Images";
import styles from '../styles/PlayingCards';
import { GameContext } from "./GameContext";

const PlayingTexts = (props: {
  NPCName?: string
  player?: boolean
  score: number
}) => {
  const { NPCName, player, score } = props;
  const { turn } = useContext(GameContext)

  const contStyle = player
    ? { ...styles.container, ...styles.play1 }
    : { ...styles.container, ...styles.play2 };

  const myColor = player ? 'blue' : 'red';

  const getTurnImage = () => {
    if (player && turn) return <Image style={styles.cursorR} source={Images.turn1} />

    if (!player && !turn) return <Image style={styles.cursorL} source={Images.turn2} />

    return null;
  };

  return (
    <View style={contStyle}>
      <Text style={{ ...styles.nameText, color: myColor }}>
        {player ? 'Player 1' : NPCName}
      </Text>
      {getTurnImage()}
      <Text style={{ ...styles.scoreText, color: myColor }}>
        Score:
        {' '}
        {score}
      </Text>
    </View>
  )
}

export default PlayingTexts
