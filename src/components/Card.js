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
      table: this.props.table 
    })
  }

  pan = new Animated.ValueXY();
  screenWidth = Dimensions.get('window').width;
  scrennHeight = Dimensions.get('window').height;
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
      // if (!this.props.player) {
      //   Animated.spring(this.pan, {
      //     toValue: { x: 0, y: 0 },
      //     friction: 5,
      //     useNativeDriver: false
      //   }).start();
      // } else {
        for (let i = 0; i <= 2; i += 1) {
          for (let j = 0; j <= 2; j += 1) {
            if (this.state.table[i][j] === null && this.isDropArea(e, gesture, i, j)) {
              Animated.spring(this.pan, {
                toValue: { x: -this.cardWidth, y: -this.cardHeight },
                friction: 10,
                useNativeDriver: false,
              }).start(() =>
                this.setState({
                  showDraggable: false
                })
              );
              this.props.table[i][j] = [this.props.card, this.props.player];
              this.setState({
                dragable: false,
                row: i,
                column: j,
                table: [...this.props.table],
              })
              this.props.handlePlaceCard(this.props.card, this.state.table, i, j);
            }
          }
        }
      // }
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

    if (this.state.table === null) return;

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
    const playerImage = player ? 'player1' : 'player2';
    let cardContainer = styles.container;

    if (row === 0) {
      cardContainer = { ...cardContainer, ...styles.topRow };
    } else if (row === 1) {
      cardContainer = { ...cardContainer, ...styles.centerRow };
    } else if (row === 2) {
      cardContainer = { ...cardContainer, ...styles.bottomRow };
    } else {
      const value = (this.scrennHeight * 0.15)  + (row - 3) * this.scrennHeight * 0.1;
      player ? cardContainer = { ...cardContainer, top: value, right: '2.5%' } :
      cardContainer = { ...cardContainer, top: value, left: '2.5%' }
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
    };

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
};

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  player: PropTypes.bool,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
};

Card.defaultProps = {
  player: false,
}

export default Card;
