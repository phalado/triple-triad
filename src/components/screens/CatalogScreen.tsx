import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CatalogCard from "../CatalogCard";

import Cards from "../../constants/Cards";
import Images from "../../constants/Images";
import CardObjectInterface from "../../interfaces/CardObjectInterface";
import styles from "../../styles/CatalogScreen"
import CatalogCardList from "../CatalogCardList";
import CatalogCardAlbum from "../CatalogCardAlbum";

const CatalogScreen = (props: { playerCards: { [card: string]: number } }) => {
  const { playerCards } = props;
  const [level, setLevel] = useState(1)
  const [selectedCard, setSelectedCard] = useState(0)
  const [catalogTypeList, setCatalogTypeList] = useState(true)

  const cardTypes = (level: number) => {
    switch (true) {
      case level <= 5: return 'Monster'
      case level <= 7: return 'Boss'
      case level <= 9: return 'Guardian Force'
      default: return 'Character'
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Catalog</Text>
        <TouchableOpacity
          style={styles.catalogTypeButton}
          onPress={() => setCatalogTypeList(prev => !prev)}
        >
          <Text style={styles.catalogTypeButtonText}>
            {catalogTypeList ? 'List' : 'Album'}
          </Text>
        </TouchableOpacity>
        <View style={styles.levelContainer}>
          <TouchableOpacity
            style={styles.levelIconContainer}
            disabled={level === 1}
            onPress={() => setLevel(prev => prev - 1)}
          >
            <Image style={styles.levelIcon} source={Images.turn2} />
          </TouchableOpacity>
          <Text style={styles.levelTitle}>{"Level " + level + ' - ' + cardTypes(level)}</Text>
          <TouchableOpacity
            style={styles.levelIconContainer}
            disabled={level === 10}
            onPress={() => setLevel(prev => prev + 1)}
          >
            <Image style={styles.levelIcon} source={Images.turn1} />
          </TouchableOpacity>
        </View>
        {catalogTypeList ?
          <CatalogCardList
            playerCards={playerCards}
            setSelectedCard={setSelectedCard}
            level={level}
          />
        :
          <CatalogCardAlbum
            playerCards={playerCards}
            setSelectedCard={setSelectedCard}
            level={level}
          />
        }
      </View>
      <View style={styles.rightContainer}>
        {!playerCards[selectedCard] ? (
          <View style={styles.cardContainer}>
            <Image style={styles.card} source={Images.cardBack} />
          </View>
        ) : (
          <CatalogCard
            card={Cards.find(card => card.id === selectedCard) as CardObjectInterface}
            cardType={cardTypes(level)}
          />
        )}
      </View>
    </View>
  )
}

export default CatalogScreen;
