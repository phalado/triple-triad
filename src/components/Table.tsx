import React from "react";
import { Image, View } from "react-native";
import ElementalBoard from "./ElementalBoard";
import OpenDrawerIcon from "./OpenDrawerIcon";
import Images from "../constants/Images";
import styles from '../styles/Table';

const Table = (props: { elemental: boolean, navigation: any }) => {
  const { elemental, navigation } = props;

  return (
    <View>
      <Image style={styles.backgroundImage} source={Images.board} />
      <Image style={styles.container} source={Images.board} />
      <OpenDrawerIcon navigation={navigation} />
      {elemental && <ElementalBoard />}
    </View>
  )
}

export default Table;
