import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import Images from "../constants/Images";
import { cardsOnTheTable } from "../helpers/OtherHelpers";
import styles from '../styles/PlayingCards';

const PlayingTexts = (props: any) => {
  const { NPCName, player, score, table, turn } = props;

  let [myTurn] = useState(turn);
  const contStyle = player
    ? { ...styles.container, ...styles.play1 }
    : { ...styles.container, ...styles.play2 };

  const myColor = player ? 'blue' : 'red';
  myTurn = cardsOnTheTable(table) % 2 === 1 ? !turn : turn;

  const getTurnImage = () => {
    if (player && myTurn) return <Image style={styles.cursorR} source={Images.turn1} />

    if (!player && !myTurn) return <Image style={styles.cursorL} source={Images.turn2} />

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
