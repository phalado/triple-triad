import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Images from "../constants/Images";
import styles from '../styles/Table';

const OpenDrawerIcon = (props: any) => {
  const { navigation } = props;

  return (
    <TouchableOpacity
      style={{position: 'absolute'}}
      onPress={() => navigation.openDrawer()}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Image style={styles.hamburguerIcon} source={Images.hamburguerIcon} />
      </View>
    </TouchableOpacity>
  )
}

export default OpenDrawerIcon
