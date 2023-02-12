import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { resetGame } from "../../helpers/OtherHelpers";
import RulesInterface from "../../interfaces/RulesInterface";
import styles from '../../styles/GameDrawer';
import { GameContext } from "../GameContext";

const GameDrawer = (
  props: {
    navigation: any
    rules:RulesInterface
    location: string
  }
) => {
  const { rules, navigation, location } = props;
  const { resetTable, createCard, resetCards } = useContext(GameContext)

  const giveUpButton = () => resetGame({ resetCards, resetTable, createCard, navigation });

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Hello Stranger!!!</Text>
      <View>
        <Text style={styles.title}>Rules enabled: </Text>
        {Object.entries(rules[location]).map(([key, value]) => {
          return value ? <Text key={key}>{key}</Text> : null;
        })}
      </View>
      <Button title="Give up" onPress={() => giveUpButton()} />
    </View>
  );
}

export default GameDrawer;
