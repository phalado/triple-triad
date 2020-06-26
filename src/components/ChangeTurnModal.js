import React from 'react';
import {
  View, Image, Text, Button,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { cardsOnTheTable, getRandomCards } from '../Helpers/OtherHelpers';
import Images from '../constants/Images';
import styles from '../styles/ChangeTurnModal';

const ChangeTurnModal = props => {
  const {
    visible, turn, gameOver, navigation, table, createCard, resetCards, resetTable,
  } = props;

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

  if (!gameOver) {
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
        // onPress={() => navigation.navigate('GamePlay')}
        onPress={() => newRandomGame()}
      />
    </Modal>
  );
};

ChangeTurnModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  turn: PropTypes.bool.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  gameOver: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
};

export default ChangeTurnModal;
