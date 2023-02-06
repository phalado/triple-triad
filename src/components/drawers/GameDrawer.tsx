import React from "react";
import { Button, Text, View } from "react-native";
import { resetGame } from "../../helpers/OtherHelpers";
import styles from '../../styles/GameDrawer';

const GameDrawer = (
  props: any
) => {
  const { rules, createCard, resetCards, resetTable, navigation, state, location } = props;

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
