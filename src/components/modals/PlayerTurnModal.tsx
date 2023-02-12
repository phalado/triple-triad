import React, { useContext } from "react";
import { View, Image, Text } from 'react-native';
import Modal from 'react-native-modal';
import Images from "../../constants/Images";
import styles from '../../styles/ModalScreen';
import { GameContext } from "../GameContext";

const PlayerTurnModal = (props: { visible: boolean, value: string }) => {
  const { visible, value } = props;
  const { turn } = useContext(GameContext)
  const imageSource = value !== 'none' ? Images[value] : turn ? Images.turn1 : Images.turn2
  const text = turn ? 'Player 1!!!' : 'Player 2!!!'

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
