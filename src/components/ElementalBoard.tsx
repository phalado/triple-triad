import React, { useContext, useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import Images from "../constants/Images";
import { CellInterface } from "../interfaces/TableInterface";
import styles from '../styles/Table';
import { GameContext } from "./GameContext";
import CSSSizes from "../constants/CSSSizes";

const ElementalBoard = () => {
  const { table, updateTable } = useContext(GameContext)
  const elements = ['fire', 'water', 'ice', 'wind', 'poison', 'thunder', 'earth', 'holy'];
  const { cardWidth, cardHeight } = CSSSizes

  useEffect(() => {
    const getRandomElement = () => {
      let value = Math.floor((1000000 * Math.random()) % 10);
      if (value > 3) return null;
  
      value = Math.floor(8 * Math.random());
      return elements[value];
    };
  
    table.forEach((row: any, i: number) => row.forEach((cell: CellInterface, j: number) => {
      const element = getRandomElement()
      if (element) updateTable(i, i, { player: cell.player, card: cell.card, element })
    }));
  }, [])


  return (
    <View>
      {table.map((row: any, i: number) => row.map((col: any, j: number) => {
        if (table[i][j].element !== null) {
          const spotStyle = {
            ...styles.elementalSpot,
            bottom: (1 - i) * cardHeight - Dimensions.get('window').height / 2,
            left: (j - 1) * cardWidth,
          };
          return (
            <Image
              style={spotStyle}
              source={Images[table[i][j].element]}
              key={JSON.stringify([i, j, table])}
            />
          );
        }
        return null;
      }))}
    </View>
  )
}

export default ElementalBoard;
