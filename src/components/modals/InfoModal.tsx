import React from "react";
import { Button, Image, Text, View } from "react-native";
import Modal from 'react-native-modal';
import Images from "../../constants/Images";
import styles from "../../styles/InfoModalStyles"

const InfoModal = (props: {
  texts: { [key: string]: string }
  visible: boolean
  title: string
  text: string
  onOk?: () => void
  onCancel?: null | (() => void)
}) => {
  const { visible, title, text, onOk, onCancel, texts } = props;

  return (
    <Modal isVisible={visible} style={styles.container}>
      <Image source={Images.info} style={styles.backgroundImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonContainer}>
        {onCancel && <Button title={texts.runAway as string} onPress={onCancel} />}
        {onOk && <Button title={texts.whatever as string} onPress={onOk} />}
      </View>
    </Modal>
  )
}

export default InfoModal;
