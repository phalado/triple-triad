import React from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Images from "../../constants/Images";
import Texts from "../../constants/Texts";
import GameOptionsInterface from "../../interfaces/GameOptionsInterface";
import styles from "../../styles/Options"

const OptionsScreen = (props:
  {
    gameOptions: GameOptionsInterface,
    changeUsername: (username: string) => void
    changeGameLanguage: (language: string) => void
    navigation: any
  }
) => {
  const { gameOptions, changeUsername, changeGameLanguage, navigation } = props;
  const { language } = gameOptions


  return (
    <View style={styles.container}>
      <View style={styles.usernameContainer}>
        <Text style={styles.label}>{Texts[(language as 'eng' | 'ptbr')].changeUsername}</Text>
        <TextInput
          style={styles.input}
          value={gameOptions.username}
          onChangeText={changeUsername}
        />
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.label}>{Texts[(language as 'eng' | 'ptbr')].changeLanguage}</Text>
        <TouchableOpacity style={styles.flag} onPress={() => changeGameLanguage('ptbr')}>
          <Image source={Images.ptbr} style={styles.flagImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flag} onPress={() => changeGameLanguage('eng')}>
          <Image source={Images.eng} style={styles.flagImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={Texts[(language as 'eng' | 'ptbr')].goBack} onPress={() => navigation.pop()} />
      </View>
    </View>
  )
}

export default OptionsScreen;
