import React, { useState } from 'react';
import {
  View, Text, Button, Alert, LogBox,
} from 'react-native';
// import ExploreModal from '../container/ExploreModal';
import Images from '../../constants/Images';
import places from '../../constants/Places';
import { balambGardenPlay, balambGardenStop } from '../../constants/Sounds';
import styles from '../../styles/ExploreInitial';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ExploreInitialScreen = (props: any) => {
  const { navigation, route } = props
  const [visible, setVisible] = useState(false);

  // const startScene = () => {
  //   navigation.pop();
  //   navigation.push('Explore Scenes', {
  //     place: places[0][1],
  //     image: places[0][2],
  //     play: places[0][3],
  //     stop: places[0][4],
  //   });
  // };

  // return <View><Text>abcdefg</Text></View>

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Coming Soon!</Text>
      {/* <ExploreModal visible={visible} startScene={startScene} /> */}
      <Button
        title="New Game"
        onPress={() => {
          Alert.alert('Wait!', 'If you have a saved game this will erase your data and start a new one. Are you sure?', [
            {
              text: 'I can\'t just run away.',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Whatever',
              onPress: () => {
                route.params.handleResetDeck();
                setVisible(true);
              },
            },
          ]);
        }}
      />
      <Button
        title="Continue"
        // onPress={() => {
        //   navigation.pop();
        //   navigation.push('Explore Scenes', {
        //     place: 'balambGarden',
        //     image: Images.balambGarden,
        //     play: balambGardenPlay,
        //     stop: balambGardenStop,
        //   });
        // }}
      />
      <Button title="Go Back" onPress={() => navigation.pop()} />
    </View>
  );
}

export default ExploreInitialScreen;
