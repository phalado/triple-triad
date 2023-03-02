import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Images from "../constants/Images";

import { getCardAlbumData } from "../helpers/CatalogHelpers";
import styles from "../styles/CatalogScreen"

const CatalogCardAlbum = (
  props: {
    playerCards: { [card: string]: number },
    setSelectedCard: (cardId: number) => void,
    level: number
  }
) => {
  const { playerCards, setSelectedCard, level } = props;

  return (
    <ScrollView style={styles.albumScrollView}>
      <View style={styles.albumContainer}>
        {getCardAlbumData(playerCards, level).map(cardData => (
          <TouchableOpacity
            style={styles.miniCardContainer}
            onPress={() => setSelectedCard(cardData[0] as number)}
            key={JSON.stringify(cardData)}
          >
            {!playerCards[cardData[0]] ? (
              <Image style={styles.card} source={Images.cardBack} />
            ) : (
              <>
              <Image style={styles.cardBackground} source={Images.player0} />
              <Image style={styles.card} source={Images[cardData[0]]} />
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default CatalogCardAlbum;
