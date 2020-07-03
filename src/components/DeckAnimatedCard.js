/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useRef } from 'react';
import {
  View, Text, Image, Dimensions, PanResponder, Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
import styles from '../styles/GameDeck';

const DeckAnimatedCard = props => {
  const {
    card, table, handleAddCard, deck,
  } = props;
  const pan = useRef(new Animated.ValueXY()).current;

  const isDropArea = (e, gesture) => gesture.moveY > Dimensions.get('window').height * 0.5;

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
      if (isDropArea(e, gesture)) handleAddCard(card.id, deck);
    },
  })).current;

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{card.name}</Text>
      <Animated.View
        style={{
          ...styles.cardContainer,
          zIndex: 30,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Image
          style={styles.image}
          source={Images.player0}
          alt="Background"
        />
        <Image
          style={styles.image}
          source={Images[card.id]}
          alt="Card"
        />
        <RankNumbers
          ranks={card.ranks}
          element={card.element}
          table={table}
          playCard={{ row: 0, column: 0, dragable: false }}
        />
      </Animated.View>
    </View>
  );
};

DeckAnimatedCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  handleAddCard: PropTypes.func.isRequired,
  deck: PropTypes.string.isRequired,
};

export default DeckAnimatedCard;
