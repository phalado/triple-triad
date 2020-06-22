/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import {
  View, Image, PanResponder, Animated, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
import rules from '../constants/Rules';
import styles from '../styles/Card';

const Card = props => {
  const {
    card, row, column, player, table, handlePlaceCard, gameOver, dragable,
  } = props;
  const [myState, setMyState] = useState({
    dragable,
    row,
    column,
    table,
  });

  const pan = useRef(new Animated.ValueXY()).current;
  // const screenWidth = Dimensions.get('window').width;
  const scrennHeight = Dimensions.get('window').height;
  const cardWidth = Dimensions.get('window').width * 0.17;
  const cardHeight = Dimensions.get('window').height * 0.28;

  const isDropArea = (e, gesture, row, column) => {
    const begX = Dimensions.get('window').width * 0.245;
    const endX = Dimensions.get('window').width * 0.415;
    const begY = Dimensions.get('window').height * 0.08;
    const endY = Dimensions.get('window').height * 0.36;

    if (myState.table === null) return;

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
      // if (!player) {
      //   Animated.spring(pan, {
      //     toValue: { x: 0, y: 0 },
      //     friction: 5,
      //     useNativeDriver: false
      //   }).start();
      // } else {
      for (let i = 0; i <= 2; i += 1) {
        for (let j = 0; j <= 2; j += 1) {
          if (myState.table[i][j] === null && isDropArea(e, gesture, i, j)) {
            Animated.spring(pan, {
              toValue: { x: -cardWidth, y: -cardHeight },
              friction: 10,
              useNativeDriver: false,
            }).start();
            myState.table[i][j] = [card, player];
            setMyState({
              dragable: false,
              row: i,
              column: j,
              table: [...myState.table],
            });
            handlePlaceCard(card, myState.table, i, j);
          }
        }
      }
      // }
      if (myState.dragable) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  })).current;

  const playerImage = player ? 'player1' : 'player2';
  let cardContainer = styles.container;

  if (row === 0) {
    cardContainer = { ...cardContainer, ...styles.topRow };
  } else if (row === 1) {
    cardContainer = { ...cardContainer, ...styles.centerRow };
  } else if (row === 2) {
    cardContainer = { ...cardContainer, ...styles.bottomRow };
  } else {
    const value = (scrennHeight * 0.15) + (row - 3) * scrennHeight * 0.1;
    cardContainer = player ? { ...cardContainer, top: value, right: '2.5%' }
      : { ...cardContainer, top: value, left: '2.5%' };
  }

  if (column === 0) {
    cardContainer = { ...cardContainer, ...styles.leftColumn };
  } else if (column === 1) {
    cardContainer = { ...cardContainer, ...styles.centerColumn };
  } else if (column === 2) {
    cardContainer = { ...cardContainer, ...styles.rightColumn };
  }

  if (!player && !rules.open) {
    return (
      <View style={cardContainer}>
        <Image
          style={styles.card}
          source={Images.cardBack}
          alt="Background"
        />
      </View>
    );
  }

  if (myState.dragable && !gameOver) {
    return (
      <Animated.View
        style={{
          ...cardContainer,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...panResponder.panHandlers}
      >
        <Image
          style={styles.card}
          source={Images[playerImage]}
          alt="Background"
        />
        <Image
          style={styles.card}
          source={Images[card.id]}
          alt="Table"
        />
        <RankNumbers ranks={card.ranks} element={card.element} />
      </Animated.View>
    );
  }

  return (
    <View style={cardContainer}>
      <Image
        style={styles.card}
        source={Images[playerImage]}
        alt="Background"
      />
      <Image
        style={styles.card}
        source={Images[card.id]}
        alt="Table"
      />
      <RankNumbers ranks={card.ranks} element={card.element} />
    </View>
  );
};

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  player: PropTypes.bool,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  handlePlaceCard: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
  dragable: PropTypes.bool.isRequired,
};

Card.defaultProps = {
  player: false,
};

export default Card;
