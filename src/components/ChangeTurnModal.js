import React from 'react';
import { View, Image, Text } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { cardsOnTheTable } from '../Helpers/OtherHelpers';
import Images from '../constants/Images';
import styles from '../styles/ChangeTurnModal';

const ChangeTurnModal = props => {
  const { visible, turn, table } = props;
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

ChangeTurnModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  turn: PropTypes.bool.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default ChangeTurnModal;
