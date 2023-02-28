import React, { useContext } from "react";
import { View, Image, Text } from 'react-native';
import Modal from 'react-native-modal';
import Images from "../../constants/Images";
import Texts from "../../constants/Texts";
import GameOptionsInterface from "../../interfaces/GameOptionsInterface";
import styles from '../../styles/ModalScreen';
import { GameContext } from "../GameContext";

const PlayerTurnModal = (props: {
  visible: boolean, value: string, gameOptions: GameOptionsInterface
}) => {
  const { visible, value, gameOptions } = props;
  const { turn } = useContext(GameContext)
  const imageSource = value !== 'none' ? Images[value] : turn ? Images.turn1 : Images.turn2
  const { language } = gameOptions
  const text = turn ? gameOptions.username : Texts[(language as 'eng' | 'ptbr')].player

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
