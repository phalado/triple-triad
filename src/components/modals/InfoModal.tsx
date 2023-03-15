import React, { useRef } from "react";
import { Button, Image, Text, View } from "react-native";
import Modal from 'react-native-modal';
import Images from "../../constants/Images";
import CSSSizes from '../../constants/CSSSizes';
import styles from "../../styles/InfoModalStyles"
import { ScrollView } from "react-native-gesture-handler";

const InfoModal = (props: {
  texts: { [key: string]: string }
  visible: boolean
  title: string
  text: string
  heightSize: 'small' | 'medium'
  onOk?: () => void
  onCancel?: null | (() => void)
}) => {
  const { visible, title, text, heightSize, onOk, onCancel, texts } = props;
  const scrollRef: any = useRef();
  const { ScreenHeight } = CSSSizes

  const heightConst: { [key: string]: number } = {
    small: ScreenHeight / 2.5,
    medium: ScreenHeight / 1.9
  }

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    if (onOk) onOk()
  }

  return (
    <Modal isVisible={visible} style={{ ...styles.container, maxHeight: heightConst[heightSize] }}>
      <Image source={Images.info} style={styles.backgroundImage} />
      <Text style={styles.title}>{title}</Text>
        <ScrollView style={styles.scrollContainer} ref={scrollRef}>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.buttonContainer}>
            {onCancel && <Button title={texts.runAway as string} onPress={onCancel} />}
            {onOk && <Button title={texts.whatever as string} onPress={onPressTouch} />}
          </View>
        </ScrollView>
    </Modal>
  )
}

export default InfoModal;
