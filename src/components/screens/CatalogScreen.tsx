import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CatalogCard from "../CatalogCard";

import Cards from "../../constants/Cards";
import Images from "../../constants/Images";
import getCardCatalogTableData from "../../helpers/CatalogHelpers";
import CardObjectInterface from "../../interfaces/CardObjectInterface";
import styles from "../../styles/CatalogScreen"

const CatalogScreen = (props: { playerCards: { [card: string]: number } }) => {
  const { playerCards } = props;
  const [level, setLevel] = useState(1)
  const [selectedCard, setSelectedCard] = useState(0)
  const tableHead = ['Id', 'Name', 'Element', 'Quantity']

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Catalog</Text>
        <View style={styles.levelContainer}>
          <TouchableOpacity
            style={styles.levelIconContainer}
            disabled={level === 1}
            onPress={() => setLevel(prev => prev - 1)}
          >
            <Image style={styles.levelIcon} source={Images.turn2} />
          </TouchableOpacity>
          <Text style={styles.levelTitle}>{"level " + level}</Text>
          <TouchableOpacity
            style={styles.levelIconContainer}
            disabled={level === 10}
            onPress={() => setLevel(prev => prev + 1)}
          >
            <Image style={styles.levelIcon} source={Images.turn1} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ width: '90%', height: '50%' }}>
          <View style={styles.tableContainer}>
            <View style={styles.tableHead}>
              {tableHead.map((value) => (
              <Text style={styles.tableText} key={value}>{value}</Text>)
              )}
            </View>
            {getCardCatalogTableData(playerCards, level).map(row => (
              <TouchableOpacity
                onPress={() => setSelectedCard(row[0] as number)}
                key={JSON.stringify(row)}
              >
                <View style={styles.tableHead}>
                  {row.map((value, index) => (
                    <Text style={styles.tableText} key={JSON.stringify([index, value])}>{value}</Text>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.rightContainer}>
        {selectedCard === 0 ? (
          <View style={styles.cardContainer}>
            <Image style={styles.card} source={Images.cardBack} />
          </View>
        ) : (
          <CatalogCard
            card={Cards.find(card => card.id === selectedCard) as CardObjectInterface}
          />
        )}
      </View>
    </View>
  )
}

export default CatalogScreen;
