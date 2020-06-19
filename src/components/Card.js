import React, { Component } from 'react';
import { View, Image, PanResponder, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
import rules from '../constants/Rules';
import styles from '../styles/Card';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      dragable: true,
      row: this.props.row,
      column: this.props.column,
    })
  }

  showDraggable = true;
  dropAreaValues = null;
  pan = new Animated.ValueXY();
  opacity = new Animated.Value(1);
  cardWidth = Dimensions.get('window').width * 0.17;
  cardHeight = Dimensions.get('window').height * 0.28;

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
    onPanResponderRelease: (e, gesture) => {
      for (let i = 0; i <= 2; i += 1) {
        for (let j = 0; j <= 2; j += 1) {
          if (this.isDropArea(e, gesture, i, j)) {
            Animated.spring(this.pan, {
              toValue: { x: -this.cardWidth, y: -this.cardHeight },
              friction: 10,
              useNativeDriver: false,
            }).start(() =>
              this.setState({
                showDraggable: false
              })
            );
            this.setState({
              dragable: false,
              row: i - 1,
              column: j - 1,
            })
          }
        }
      } 
      if (this.state.dragable) {
        Animated.spring(this.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false
        }).start();
      }
    }
  });

  isDropArea(e, gesture, row, column) {
    const begX = Dimensions.get('window').width * 0.245;
    const endX = Dimensions.get('window').width * 0.415;
    const begY = Dimensions.get('window').height * 0.08;
    const endY = Dimensions.get('window').height * 0.36;

    if (row === 1 && column === 1) return;

    return (
      gesture.moveY > begY + (row * this.cardHeight)
      && gesture.moveY < endY + (row * this.cardHeight)
      && gesture.moveX > begX + (column * this.cardWidth)
      && gesture.moveX < endX + (column * this.cardWidth)
    )
  }

  render() {
    const { card, player } = this.props;
    const { row, column } = this.state;
    let cardContainer = styles.container;

    if (row === -1) {
      cardContainer = { ...cardContainer, ...styles.topRow };
    } else if (row === 0) {
      cardContainer = { ...cardContainer, ...styles.centerRow };
    } else if (row === 1) {
      cardContainer = { ...cardContainer, ...styles.bottomRow };
    } else {
      const value = Dimensions.get('window').height * 0.05 + (row - 2) * 40;
      // const value = 40;
      cardContainer = { ...cardContainer, top: value, right: 40 };
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

    if (this.state.dragable) {
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

    return (
      <View style={cardContainer}>
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
      </View>
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
