import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { getCardCatalogTableData } from "../helpers/CatalogHelpers";
import styles from "../styles/CatalogScreen"

const CatalogCardList = (
  props: {
    playerCards: { [card: string]: number },
    setSelectedCard: (cardId: number) => void,
    level: number,
    texts: { [key: string]: string }
  }
) => {
  const { playerCards, setSelectedCard, level, texts } = props;
  const tableHead = texts.catalogTableHead.split('-')

  return (
    <ScrollView style={{ width: '90%', height: '50%' }}>
      <View style={styles.tableContainer}>
        <View style={styles.tableHead}>
          {tableHead.map((value) => <Text style={styles.tableText} key={value}>{value}</Text>)}
        </View>
        {getCardCatalogTableData(playerCards, level).map(row => (
          <TouchableOpacity
            onPress={() => setSelectedCard(row[0] as number)}
            key={JSON.stringify(row)}
          >
            <View style={styles.tableHead}>
              {row.map((value, index) => {
                let text: string | number = '?????'

                if (index === 2) text = value === 'neutral' ? '-' : texts[value]
                else if (index !== 1 || (index === 1 && playerCards[row[0]])) text = value

                return (
                  <Text style={styles.tableText} key={JSON.stringify([index, value])}>
                    {text}
                  </Text>
                )
              })}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default CatalogCardList;
