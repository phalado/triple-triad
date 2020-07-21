import React, { useCallback, useState } from 'react';
import {
  View, Image, Button, Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import PlacesModal from './PlacesModal';
import NPCsTable from './NPCsTable';
import { getTableData } from '../Helpers/ExploreModeHelper';
import styles from '../styles/ExploreScenes';

const ExploreScenes = props => {
  const {
    navigation, route, npcs, createNPCList, resetTable,
  } = props;
  const {
    place, image, play, stop,
  } = route.params;
  const [visible, setVisible] = useState(false);

  const [tableHead] = useState(['Name', 'Wins', 'Looses', 'Ties', 'Chalenge']);
  const [tableData] = useState(getTableData(npcs, place));

  if (Object.entries(npcs).length === 0) createNPCList();

  useFocusEffect(
    useCallback(() => {
      play();

      return () => stop();
    }, []),
  );

  const handleTravel = (place, image, play, stop) => {
    navigation.pop();
    navigation.push('Explore Scenes', {
      place, image, play, stop,
    });
  };

  const startGame = (npcDeck, npc) => {
    resetTable();
    navigation.navigate('Choose Cards', { npcDeck, location: place, npc });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={image} alt="Table" />
      <View style={styles.subContainerLeft}>
        <PlacesModal visible={visible} handleTravel={handleTravel} />
        <Button title="Travel" onPress={() => setVisible(true)} />
        <Button
          title="Edit Deck"
          onPress={() => navigation.navigate('Game Deck', { screen: 'Game Deck', params: { deck: 'none', type: 'player' } })}
        />
        <Button title="Go Back" onPress={() => navigation.pop()} />
      </View>
      <View style={styles.subContainerRight}>
        <Text style={styles.text}>List of players</Text>
        <ScrollView style={{ width: '90%', height: '50%' }}>
          <NPCsTable tableHead={tableHead} tableData={tableData} startGame={startGame} />
        </ScrollView>
      </View>
    </View>
  );
};

ExploreScenes.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
  npcs: PropTypes.objectOf(PropTypes.object).isRequired,
  createNPCList: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
};

export default ExploreScenes;
