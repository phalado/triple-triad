import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import Texts from "../../constants/Texts";
import { resetGame } from "../../helpers/OtherHelpers";
import GameOptionsInterface from "../../interfaces/GameOptionsInterface";
import RulesInterface from "../../interfaces/RulesInterface";
import styles from '../../styles/GameDrawer';
import { GameContext } from "../GameContext";

const GameDrawer = (
  props: {
    navigation: any
    rules: RulesInterface
    location: string
    gameOptions: GameOptionsInterface
  }
) => {
  console.log(props)
  const { rules, navigation, location, gameOptions } = props;
  const { language, username } = gameOptions;
  const { resetTable, createCard, resetCards } = useContext(GameContext)
  const [texts] = useState(Texts[(language as 'eng' | 'ptbr')])

  const giveUpButton = () => resetGame({ resetCards, resetTable, createCard, navigation, texts });

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{texts.hello + " " + username + "!!!"}</Text>
      <View>
        <Text style={styles.title}>{texts.rulesEnabled}</Text>
        {Object.entries(rules[location]).map(([key, value]) => {
          return value ? <Text key={key}>{key}</Text> : null;
        })}
      </View>
      <Button title={texts.giveUp} onPress={() => giveUpButton()} />
    </View>
  );
}

export default GameDrawer;
