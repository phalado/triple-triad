import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, PanResponder, View } from "react-native";
import { Audio } from 'expo-av';
import { cardSound } from "../constants/Sounds";
import { cardsOnTheTable, getCardContainer } from "../helpers/OtherHelpers";
import CardInterface from "../interfaces/CardInterface";
import RulesInterface from "../interfaces/RulesInterface";
import TableInterface from "../interfaces/TableInterface";
import styles from '../styles/AnimatedCard';
import Images from "../constants/Images";
import RankNumbers from "./RankNumbers";

const AnimatedCard = (
  props: {
    card: any,
    playCard: CardInterface,
    player: boolean,
    table: TableInterface,
    handlePlaceCard: (
      card: CardInterface,
      oldRow: number,
      oldColumn: number,
      tble: any,
      row: number,
      column: number
    ) => void,
    gameOver: boolean | string,
    turn: boolean,
    rules: any
  }
) => {
  const { card, playCard, player, table, handlePlaceCard, gameOver, turn, rules } = props;
  const { row, column, dragable } = playCard;
  const [myTable, setMyTable] = useState(table);
  let [myTurn] = useState(turn);
  const [music, setMusic] = useState<any>(null)

  useEffect(() => {
    const setMusicState = async () => {
      Audio.Sound.createAsync(cardSound).then(({ sound }) => setMusic(sound))
    }

    setMusicState()
  })

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

    // if (myTable[row][column][0] !== null) return;
    if (myTable[row][column].card !== null) return;

    return (
      gesture.moveY > begY + (row * cardHeight)
      && gesture.moveY < endY + (row * cardHeight)
      && gesture.moveX > begX + (column * cardWidth)
      && gesture.moveX < endX + (column * cardWidth)
    );
  };

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
      myTurn = cardsOnTheTable(myTable) % 2 === 1 ? !turn : turn;
      if (player !== myTurn) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
        music.playAsync();
      } else {
        for (let i = 0; i <= 2; i += 1) {
          for (let j = 0; j <= 2; j += 1) {
            if (myTable[i][j].card === null && isDropArea(e, gesture, i, j)) {
              Animated.spring(pan, {
                toValue: { x: -cardWidth, y: -cardHeight },
                friction: 10,
                useNativeDriver: false,
              }).start();
              myTable[i][j] = { card, player, element: table[i][j].element };
              setMyTable(myTable);
              music.playAsync();
              handlePlaceCard(card, row, column, myTable, i, j);
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
        music.playAsync();
      }
    },
  })).current;

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
      <Image style={styles.card} source={Images[playerImage]} />
      <Image style={styles.card} source={Images[card.id]} />
      <RankNumbers
        ranks={card.ranks}
        element={card.element}
        table={table}
        playCard={playCard}
        player0={false}
      />
    </Animated.View>
  );

  return (
    <View style={cardContainer}>
      <Image style={styles.card} source={Images[playerImage]} />
      <Image style={styles.card} source={Images[card.id]} />
      <RankNumbers
        ranks={card.ranks}
        element={card.element}
        table={table}
        playCard={playCard}
        player0={false}
      />
    </View>
  );
}

export default AnimatedCard
