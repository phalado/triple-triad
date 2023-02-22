import React from "react";
import { Image, View, Text } from "react-native";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import RankNumbers from "./RankNumbers";
import Images from "../constants/Images";
import styles from "../styles/CatalogScreen"

const CatalogCard = (
  props: {
    card: CardObjectInterface
  }
) => {
  const { card } = props;

  return (
    <>
      <View style={styles.cardContainer}>
        <Image style={styles.cardBackground} source={Images.player0} />
        <Image style={styles.card} source={Images[card.id]} />
        <RankNumbers
          ranks={card.ranks}
          element={card.element}
          player0={false}
        />
      </View>
      <View style={styles.aboutCard}>
        <Text style={styles.aboutText}>{card.name + " - Monster"}</Text>
        <Text style={styles.aboutText}>{card.element}</Text>
      </View>
    </>
  );
}

export default CatalogCard
