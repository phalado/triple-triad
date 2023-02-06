import React from "react";
import { Image, View } from "react-native";
import Images from "../constants/Images";
import styles from '../styles/Table';
import ElementalBoard from "./containers/ElementalBoard";
import OpenDrawerIcon from "./OpenDrawerIcon";

const Table = (props: { elemental: boolean, navigation: any }) => {
  const { elemental, navigation } = props;

  return (
    <View>
      <Image style={styles.container} source={Images.board} />
      <OpenDrawerIcon navigation={navigation} />
      {true && <ElementalBoard />}
    </View>
  )
}

export default Table;
