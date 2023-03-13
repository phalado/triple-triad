import React from "react";
import { Image, View, Text } from "react-native";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import RankNumbers from "./RankNumbers";
import Images from "../constants/Images";
import styles from "../styles/CatalogScreen"
import Texts from "../constants/Texts";

const CatalogCard = (
  props: { card: CardObjectInterface, cardType: string, language: string }
) => {
  const { card, cardType, language } = props;
  const texts: { [key: string]: string } = Texts[(language as 'eng' | 'ptbr')]

  return (
    <>
      <View style={styles.cardContainer}>
        <Image style={styles.cardBackground} source={Images.player0} />
        <Image style={styles.card} source={Images[card.id]} />
        <RankNumbers
          ranks={card.ranks}
          element={card.element}
          player0={false}
          size={'bigCard'}
        />
      </View>
      <View style={styles.aboutCard}>
        <Text style={styles.aboutText}>{card.name + " - " + cardType}</Text>
        <Text style={styles.aboutText}>
          {texts.element + ": " + texts[card.element]}
        </Text>
      </View>
    </>
  );
}

export default CatalogCard
