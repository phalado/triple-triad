import React, { useRef } from "react";
import { Animated, Dimensions, Image, PanResponder, Text, View } from "react-native";
import RankNumbers from "./RankNumbers";
import Images from "../constants/Images";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import styles from '../styles/GameDeck';


const DeckAnimatedCard = (
  props: {
    card: CardObjectInterface
    handleAddCard: (cardId: number) => void
    deck: number[]
  }
) => {
  const { card, handleAddCard, deck } = props;
  const pan = useRef<any>(new Animated.ValueXY()).current;

  const isDropArea = (
    _: any, gesture: any
  ) => gesture.moveY > Dimensions.get('window').height * 0.5;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y },
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, gesture) => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: false,
      }).start();
      if (isDropArea(e, gesture)) handleAddCard(card.id);
    },
  })).current;

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{card.name}</Text>
      <Animated.View
        style={{
          ...styles.cardContainer,
          zIndex: 10,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Image style={styles.image} source={Images.player0} />
        <Image style={styles.image} source={Images[card.id]} />
        <RankNumbers
          ranks={card.ranks}
          element={card.element}
          playCard={{ row: 0, column: 0, dragable: false }}
          player0={true}
        />
      </Animated.View>
    </View>
  );
}

export default DeckAnimatedCard;
