import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Images from "../constants/Images";
import styles from "../styles/PupuEvents"

const PupuEvent = (props: { getPupuEvent: () => void }) => {
  const { getPupuEvent } = props;

  return (
    <TouchableOpacity onPress={() => getPupuEvent()} style={styles.container}>
      <Image style={styles.image} source={Images.ufo} />
    </TouchableOpacity>
  )
}

export default PupuEvent;
