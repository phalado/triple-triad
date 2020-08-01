import React, { useCallback, useState } from 'react';
import {
  View, Image, Button, Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import PlacesModal from './PlacesModal';
import NPCsTable from './NPCsTable';
import PupuEvent from './PupuEvent';
import { getTableData, getRandonPlayerCards } from '../Helpers/ExploreModeHelper';
import { getRandomNumber } from '../Helpers/OtherHelpers';
import styles from '../styles/ExploreScenes';
import CardModal from './CardModal';

const ExploreScenes = props => {
  const {
    navigation, route, table, npcs, createNPCList, resetTable, events,
    changeEvent, addCardToExploreDeck, rules, playerCards,
  } = props;
  const {
    place, image, play, stop,
  } = route.params;
  const [visible, setVisible] = useState(false);
  const [tableHead] = useState(['Name', 'Wins', 'Looses', 'Ties', 'Chalenge']);
  const [tableData] = useState(getTableData(npcs, place));
  const [cardVisible, setCardVisible] = useState(false);
  const [cardOwner, setCardOwner] = useState('player0');


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
    if (rules[place].random) getRandonPlayerCards(playerCards);
    navigation.navigate('Choose Cards', { npcDeck, location: place, npc });
  };

  const getPupuEvent = () => {
    if (events.pupu1) changeEvent('pupu1');
    else if (events.pupu2) changeEvent('pupu2');
    else if (events.pupu3) changeEvent('pupu3');
    else {
      changeEvent('pupu4');
      addCardToExploreDeck(48);
      setCardVisible(true);
      setCardOwner('player0');
      setTimeout(() => {
        setCardOwner('player1');
        setTimeout(() => {
          setCardVisible(false);
        }, 1000);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={image} alt="Background image" />
      <View style={styles.subContainerLeft}>
        <PlacesModal visible={visible} handleTravel={handleTravel} />
        <CardModal visible={cardVisible} card={48} table={table} cardOwner={cardOwner} />
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
      {(getRandomNumber(0, 10) <= 2 && events.pupu4)
        ? <PupuEvent getPupuEvent={getPupuEvent} /> : null}
    </View>
  );
};

ExploreScenes.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
  npcs: PropTypes.objectOf(PropTypes.object).isRequired,
  createNPCList: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
  events: PropTypes.objectOf(PropTypes.any).isRequired,
  changeEvent: PropTypes.func.isRequired,
  addCardToExploreDeck: PropTypes.func.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  rules: PropTypes.objectOf(PropTypes.any).isRequired,
  playerCards: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreScenes;
