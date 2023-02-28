import React, { useState } from 'react';
import { View, Text, Button, Alert, LogBox } from 'react-native';
import Images from '../../constants/Images';
import places from '../../constants/Places';
import { balambGarden } from '../../constants/Sounds';
import ExploreModal from '../containers/ExploreModal';
import styles from '../../styles/ExploreInitial';
import Texts from '../../constants/Texts';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ExploreInitialScreen = (props: { navigation: any, route: any }) => {
  const { navigation, route } = props
  const { eventNewGame, language } = route.params
  const [visible, setVisible] = useState(false);
  const [texts] = useState(Texts[(language as 'eng' | 'ptbr')])

  const startScene = () => {
    navigation.pop();
    navigation.push('Explore Scenes', {
      place: places[0][1],
      image: places[0][2],
      audio: places[0][3],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Coming Soon!</Text>
      <ExploreModal visible={visible} startScene={startScene} />
      <Button
        title="New Game"
        onPress={() => {
          Alert.alert(texts.wait, texts.newGameAlert, [
            {
              text: texts.runAway,
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: texts.whatever,
              onPress: () => {
                route.params.handleResetDeck();
                setVisible(true);
              },
            },
          ]);
        }}
      />
      {!eventNewGame && <Button
        title={texts.continue}
        onPress={() => {
          navigation.pop();
          navigation.push('Explore Scenes', {
            place: 'balambGarden',
            image: Images.balambGarden,
            audio: balambGarden,
          });
        }}
      />}
      <Button title={texts.goBack} onPress={() => navigation.pop()} />
    </View>
  );
}

export default ExploreInitialScreen;
