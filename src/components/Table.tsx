import React from "react";
import { Image, View } from "react-native";
import Images from "../constants/Images";
import styles from '../styles/Table';
import ElementalBoard from "./ElementalBoard";
import OpenDrawerIcon from "./OpenDrawerIcon";

const Table = (props: { elemental: boolean, navigation: any }) => {
  const { elemental, navigation } = props;

  return (
    <View>
      <Image style={styles.container} source={Images.board} />
      <OpenDrawerIcon navigation={navigation} />
      {elemental && <ElementalBoard />}
    </View>
  )
}

export default Table;
