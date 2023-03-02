import React from "react";
import { Image, Text, View } from "react-native";
import RankNumbers from "./RankNumbers";
import Cards from "../constants/Cards";
import Images from "../constants/Images";
import styles from '../styles/GameDeck';

const GetDecksCards = (props: {
  cardId: number
  index: number
  handleRemoveCard: (cardId: number, deck: number[]) => void
  deck: number[]
  texts: { [key: string]: string | string[] }
}) => {
  const { cardId, index, handleRemoveCard, deck, texts } = props;

  if (cardId) {
    const card:any = Cards.find(crd => crd.id === cardId);

    if (handleRemoveCard) {
      return (
        <View style={styles.playerCardContainer} key={JSON.stringify([cardId, index])}>
          <Text style={styles.title2}>{card.name}</Text>
          <View style={styles.cardContainer}>
            <Image style={styles.image} source={Images.player0} />
            <Image style={styles.image} source={Images[card.id]} />
            <RankNumbers ranks={card.ranks} element={card.element} player0={true} />
            <Text
              style={styles.removeClickable}
              onPress={() => handleRemoveCard(cardId, deck)}
            >
              {'  '}
              x
              {'  '}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.playerCardContainer} key={JSON.stringify([cardId, index])}>
        <Text style={styles.title2}>{card.name}</Text>
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={Images.player0} />
          <Image style={styles.image} source={Images[card.id]} />
          <RankNumbers ranks={card.ranks} element={card.element} player0={true} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.playerCardContainer} key={JSON.stringify([cardId, index])}>
      <Text style={styles.title}>{texts.emptySpot}</Text>
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={Images.player0} />
      </View>
    </View>
  );
}

export default GetDecksCards;
