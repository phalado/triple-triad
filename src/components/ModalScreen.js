import React from 'react';
import {
  View, Image, Text, Button,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { cardsOnTheTable, getRandomCards, getCardsId } from '../Helpers/OtherHelpers';
import Images from '../constants/Images';
import Rules from '../constants/Rules';
import styles from '../styles/ChangeTurnModal';

const ModalScreen = props => {
  const {
    visible, turn, gameOver, navigation, value, cards, table, createCard, resetCards, resetTable,
  } = props;

  if (value !== 'none') {
    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <Image
            style={styles.gameOverImage}
            source={Images[value]}
            alt="Cursor"
          />
        </View>
      </Modal>
    );
  }

  if (gameOver) {
    const newRandomGame = () => {
      resetTable();
      resetCards();

      let newCards = getRandomCards();
      newCards.forEach((card, index) => {
        createCard({
          player: true, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      newCards = getRandomCards();
      newCards.forEach((card, index) => {
        createCard({
          player: false, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      navigation.goBack(null);
      navigation.navigate('GamePlay');
    };

    const sudenDeathGame = () => {
      resetTable();
      const allCards = getCardsId([...cards.play1Cards, ...cards.play2Cards]);
      resetCards();

      allCards.newP1Cards.forEach((card, index) => {
        createCard({
          player: true, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      allCards.newP2Cards.forEach((card, index) => {
        createCard({
          player: false, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      navigation.goBack(null);
      navigation.navigate('GamePlay');
    };

    if (Rules.sudenDeath && gameOver === 'tie') {
      // setTimeout(() => sudenDeathGame(), 2000);
      sudenDeathGame();
      return (
        <Modal isVisible={visible}>
          <View style={styles.container}>
            <Image
              style={styles.gameOverImage}
              source={Images[gameOver]}
              alt="Cursor"
            />
          </View>
        </Modal>
      );
    }

    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <Image
            style={styles.gameOverImage}
            source={Images[gameOver]}
            alt="Cursor"
          />
        </View>
        <Button
          title="New random game"
          onPress={() => newRandomGame()}
        />
      </Modal>
    );
  }

  const myTurn = cardsOnTheTable(table) % 2 === 1 ? !turn : turn;

  if (myTurn) {
    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={Images.turn1}
            alt="Cursor"
          />
          <Text style={styles.text}>Player 1!!!</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={Images.turn2}
          alt="Cursor"
        />
        <Text style={styles.text}>Player 2!!!</Text>
      </View>
    </Modal>
  );
};

ModalScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
  turn: PropTypes.bool.isRequired,
  cards: PropTypes.shape({
    play1Cards: PropTypes.arrayOf(PropTypes.object),
    play2Cards: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  gameOver: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  value: PropTypes.string.isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
};

export default ModalScreen;
