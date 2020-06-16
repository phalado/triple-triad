import React, { Component } from 'react';
import { View, Image, PanResponder, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
import rules from '../constants/Rules';
import styles from '../styles/Card';

class Card extends Component {
  constructor(props) {
    super(props);
  }
  // eslint-disable-next-line
  pan = new Animated.ValueXY();

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y }
    ],{ useNativeDriver: false }),
    onPanResponderRelease: () => {
      Animated.spring(this.pan, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: false
      }).start();
    }
  });

  render() {
    const {
      card, row, column, player,
    } = this.props;
    let cardContainer = styles.container;

    if (row === -1) {
      cardContainer = { ...cardContainer, ...styles.topRow };
    } else if (row === 0) {
      cardContainer = { ...cardContainer, ...styles.centerRow };
    } else if (row === 1) {
      cardContainer = { ...cardContainer, ...styles.bottomRow };
    } else {
      const value = (row - 2) * 40;
      cardContainer = { ...cardContainer, top: value };
    }

    if (column === -1) {
      cardContainer = { ...cardContainer, ...styles.leftColumn };
    } else if (column === 0) {
      cardContainer = { ...cardContainer, ...styles.centerColumn };
    } else if (column === 1) {
      cardContainer = { ...cardContainer, ...styles.rightColumn };
    }

    if (player === 'player2' && !rules.open) {
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

    return (
      <Animated.View
        style={{
          ...cardContainer,
          transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
        }}
        {...this.panResponder.panHandlers}
      >
        <Image
          style={styles.card}
          source={Images[player]}
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
  };
};

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  player: PropTypes.string.isRequired,
};

export default Card;
