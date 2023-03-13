import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, PanResponder, View } from "react-native";
// import { Audio } from 'expo-av';
import { getCardContainer } from "../helpers/OtherHelpers";
import CardInterface from "../interfaces/CardInterface";
import styles from '../styles/AnimatedCard';
import Images from "../constants/Images";
import RankNumbers from "./RankNumbers";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import PreLoadedSoundsInterface from "../interfaces/PreLoadedSounds";
import { LocalRulesInterface } from "../interfaces/RulesInterface";
import { GameContext } from "./GameContext";

const AnimatedCard = (
  props: {
    card: CardObjectInterface,
    playCard: CardInterface,
    player: boolean,
    handlePlaceCard: (
      player: boolean,
      card: CardObjectInterface,
      oldRow: number,
      oldColumn: number,
      row: number,
      column: number
    ) => void,
    gameOver: boolean | string,
    rules: LocalRulesInterface,
    preLoadedSounds: PreLoadedSoundsInterface,
  }
) => {
  const { 
    card,
    playCard,
    player,
    handlePlaceCard,
    gameOver,
    rules,
    preLoadedSounds,
  } = props;
  const { row, column, dragable } = playCard;
  const { table, turn } = useContext(GameContext)

  const pan = useRef<any>(new Animated.ValueXY()).current;

  const scrennHeight = Dimensions.get('window').height;
  const cardWidth = Dimensions.get('window').width * 0.17;
  const cardHeight = Dimensions.get('window').height * 0.28;

  const playerImage = player ? 'player1' : 'player2';
  const cardContainer = getCardContainer(row, column, player, scrennHeight, styles);

  const isDropArea = (_: any, gesture: any, row: number, column: number) => {
    const begX = Dimensions.get('window').width * 0.245;
    const endX = Dimensions.get('window').width * 0.415;
    const begY = Dimensions.get('window').height * 0.08;
    const endY = Dimensions.get('window').height * 0.36;

    if (table[row][column].card !== null) return;

    return (
      gesture.moveY > begY + (row * cardHeight)
      && gesture.moveY < endY + (row * cardHeight)
      && gesture.moveX > begX + (column * cardWidth)
      && gesture.moveX < endX + (column * cardWidth)
    );
  };

  const panResponder = PanResponder.create({
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
      if (player !== turn) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
        preLoadedSounds.cardSound.playAsync()
        setTimeout(() => preLoadedSounds.cardSound.stopAsync(), 1000);
      } else {
        for (let i = 0; i <= 2; i += 1) {
          for (let j = 0; j <= 2; j += 1) {
            if (table[i][j].card === null && isDropArea(e, gesture, i, j)) {
              Animated.spring(pan, {
                toValue: { x: -cardWidth, y: -cardHeight },
                friction: 10,
                useNativeDriver: false,
              }).start();
              preLoadedSounds.cardSound.playAsync()
              setTimeout(() => preLoadedSounds.cardSound.stopAsync(), 1000);
              handlePlaceCard(player, card, row, column, i, j);
            }
          }
        }
      }
      if (dragable) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
        preLoadedSounds.cardSound.playAsync()
        setTimeout(() => preLoadedSounds.cardSound.stopAsync(), 1000);
      }
    },
  });

  if (!player && !rules.open && row > 2) return (
    <View style={cardContainer}>
      <Image style={styles.card} source={Images.cardBack} />
    </View>
  );

  if (dragable && !gameOver) return (
    <Animated.View
      style={{
        ...cardContainer,
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <Image style={styles.cardBackground} source={Images[playerImage]} />
      <Image style={styles.card} source={Images[card.id]} />
      <RankNumbers
        ranks={card.ranks}
        element={card.element}
        playCard={playCard}
        player0={false}
        size={'smallCard'}
      />
    </Animated.View>
  );

  return (
    <View style={cardContainer}>
      <Image style={styles.cardBackground} source={Images[playerImage]} />
      <Image style={styles.card} source={Images[card.id]} />
      <RankNumbers
        ranks={card.ranks}
        element={card.element}
        playCard={playCard}
        player0={false}
        size={'smallCard'}
      />
    </View>
  );
}

export default AnimatedCard
