import React from "react";
import { View, Image, Text } from 'react-native';
import Modal from 'react-native-modal';
import Images from "../../constants/Images";
import { cardsOnTheTable } from "../../helpers/OtherHelpers";
import TableInterface from "../../interfaces/TableInterface";
import styles from '../../styles/ModalScreen';

const PlayerTurnModal = (
  props: { table: TableInterface, visible: boolean, turn: boolean, value: string }
) => {
  const { table, visible, turn, value } = props;
  const myTurn = cardsOnTheTable(table) % 2 === 1 ? !turn : turn;
  const imageSource = value !== 'none' ? Images[value] : myTurn ? Images.turn1 : Images.turn2
  const text = myTurn ? 'Player 1!!!' : 'Player 2!!!'

  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Image style={styles.image} source={imageSource} />
        {value !== 'none' && <Text style={styles.text}>{text}</Text>}
      </View>
    </Modal>
  )
}

export default PlayerTurnModal;
