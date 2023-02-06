import React, { useCallback, useEffect, useState } from 'react'
import { Button, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import { getRandonPlayerCards, getTableData } from '../../helpers/ExploreModeHelpers';
import NPCsTable from '../NPCsTable';
import CardModal from '../modals/CardModal';
import PlacesModal from '../modals/PlacesModal';
import RulesInterface from '../../interfaces/RulesInterface';
import CardInterface from '../../interfaces/CardInterface';
import { NpcsInterface } from '../../interfaces/NpcsInterface';
import styles from '../../styles/ExploreScenes';
import { useFocusEffect } from '@react-navigation/native';
import TableInterface from '../../interfaces/TableInterface';

const ExploreScenes = (
  props:
  {
    navigation: any,
    route: any
    table: TableInterface
    npcs: NpcsInterface
    events: { [event: string]: boolean }
    rules: RulesInterface
    playerCards: { [index: string]: number }
    addCardToExploreDeck: (card: number) => void,
    createNPCList: () => void
    resetTable: () => void
    changeEvent: (event: string) => void
    createCard: (player: boolean, card: CardInterface) => void
    resetCards: () => void
  }
) => {
  const {
    navigation,
    route,
    table,
    npcs,
    events,
    rules,
    playerCards,
    addCardToExploreDeck,
    createNPCList,
    resetTable,
    changeEvent,
    createCard,
    resetCards
  } = props;
  const { place, image, audio } = route.params;
  const [visible, setVisible] = useState(false);
  const [tableHead] = useState(['Name', 'Wins', 'Looses', 'Ties', 'Chalenge']);
  const [tableData] = useState(getTableData(npcs, place));
  const [cardVisible, setCardVisible] = useState(false);
  const [cardOwner, setCardOwner] = useState('player0');

  useFocusEffect(
    useCallback(() => {
      let music: any = null;

      const setMusic = async () => {
        Audio.Sound.createAsync(audio).then(({ sound }) => {
          music = sound
          music.playAsync()
          music.setIsLoopingAsync(true)
        })
      }

      setMusic()

      return () => music.unloadAsync();
    }, []),
  );

  if (Object.entries(npcs).length === 0) createNPCList();

  const addCardsToStore = (myDeck: number[], npcDeck: number[]) => {
    resetCards();
    myDeck.forEach((card, index) => {
      createCard (true, { id: card, row: 3 + index, column: 3, dragable: true });
    });

    npcDeck.forEach((card, index) => {
      createCard(false, { id: card, row: 3 + index, column: 3, dragable: true });
    });
  };

  const handleTravel = (place: string, image: any, audio: any) => {
    navigation.pop();
    navigation.push('Explore Scenes', { place, image, audio });
  };

  const startGame = (npcDeck: number[], npc: any) => {
    resetTable();
    if (rules[place].random) {
      addCardsToStore(getRandonPlayerCards(playerCards), npcDeck);
      navigation.push('GamePlayDrawer', { screen: 'GamePlayDrawer', params: { npcDeck, location: place, npc } });
    } else navigation.navigate('Choose Cards', { npcDeck, location: place, npc });
  };

  //MELHORAR
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
      <Image style={styles.backgroundImage} source={image} />
      <View style={styles.subContainerLeft}>
        <PlacesModal visible={visible} handleTravel={handleTravel} />
        <CardModal visible={cardVisible} cardId={48} table={table} cardOwner={cardOwner} />
        <Button title="Travel" onPress={() => setVisible(true)} />
        {/* <Button
          title="Edit Deck"
          onPress={() => navigation.navigate('Game Deck', { screen: 'Game Deck', params: { deck: 'none', type: 'player' } })}
        /> */}
        <Button title="Go Back" onPress={() => navigation.pop()} />
      </View>
      <View style={styles.subContainerRight}>
        <Text style={styles.text}>List of players</Text>
        <ScrollView style={{ width: '90%', height: '50%' }}>
          <NPCsTable tableHead={tableHead} tableData={tableData as any} startGame={startGame} />
        </ScrollView>
      </View>
      {/* {(getRandomNumber(0, 10) <= 2 && events.pupu4) && <PupuEvent getPupuEvent={getPupuEvent} />} */}
    </View>
  );
};

export default ExploreScenes;
