import React, { useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import Images from "../constants/Images";
import styles from '../styles/Table';
import { cloneTable } from "../helpers/OtherHelpers";

const ElementalBoard = (props: any) => {
  const { table, modifyTable } = props

  const elements = ['fire', 'water', 'ice', 'wind', 'poison', 'thunder', 'earth', 'holy'];
  const cardWidth = Dimensions.get('window').width * 0.17;
  const cardHeight = Dimensions.get('window').height * 0.28;

  useEffect(() => {
    let newTable = cloneTable(table)

    const getRandomElement = () => {
      let value = Math.floor((1000000 * Math.random()) % 10);
      if (value > 3) return null;
  
      value = Math.floor(8 * Math.random());
      return elements[value];
    };
  
    table.forEach((row: any, i: number) => row.forEach((column: any, j: number) => {
      const element = getRandomElement()
      if (element) {
        newTable[i][j].element = element
        console.log(i, j, element)
      }
    }));

    modifyTable([...newTable]);
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
