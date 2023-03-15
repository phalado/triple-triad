import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import NPCsTable from '../NPCsTable';
import PupuEvent from '../PupuEvent';
import { cardClubEvents, getRandonPlayerCards, getTableData, rareCardsQuest } from '../../helpers/ExploreModeHelpers';
import { getRandomNumber } from '../../helpers/OtherHelpers';
import CardModal from '../modals/CardModal';
import PlacesModal from '../modals/PlacesModal';
import RulesInterface from '../../interfaces/RulesInterface';
import { NpcInterface, NpcsInterface } from '../../interfaces/NpcsInterface';
import styles from '../../styles/ExploreScenes';
import { GameContext } from '../GameContext';
import Texts from '../../constants/Texts';
import GameOptionsInterface from '../../interfaces/GameOptionsInterface';
import AchievementsInterface from '../../interfaces/AchievementsInterface';
import ToastMessage from "../containers/ToastMessage";
import InfoModal from '../modals/InfoModal';

const ExploreScenes = (
  props:
  {
    navigation: any,
    route: any
    npcs: NpcsInterface
    events: { [event: string]: boolean }
    rules: RulesInterface
    playerCards: { [index: string]: number }
    cardQueen: any,
    gameOptions: GameOptionsInterface
    achievements: AchievementsInterface
    addCardToExploreDeck: (card: number) => void
    createNPCList: () => void
    changeEvent: (event: string) => void
    changeLastLocation: (location: string) => void
    changeAchievement: (achievement: string) => void
    addCardToNPC: (data: { npc: string, card: number, location: string }) => void
    addNpcToLocation: (data: { npc: NpcInterface, location: string }) => void
    changeCardQueenPlace: (place: string) => void
  }
) => {
  const {
    navigation,
    route,
    npcs,
    events,
    rules,
    playerCards,
    cardQueen,
    gameOptions,
    achievements,
    addCardToExploreDeck,
    createNPCList,
    changeEvent,
    changeLastLocation,
    changeAchievement,
    addCardToNPC,
    addNpcToLocation,
    changeCardQueenPlace
  } = props;
  const { place, image, audio } = route.params;
  const [texts] = useState(Texts[(gameOptions.language as 'eng' | 'ptbr')])
  const [visible, setVisible] = useState(false);
  const [tableHead] = useState(texts.npcTableHead.split('-'));
  const [tableData, setTableData] = useState(getTableData(npcs, place, cardQueen));
  const [cardVisible, setCardVisible] = useState(false);
  const [cardOwner, setCardOwner] = useState('player0');
  const {
    resetTable,
    createCard,
    resetCards,
    npc,
    setNpc,
    cardId,
    setCardId,
    gameOverState,
    setGameOverState
  } = useContext(GameContext)

  useFocusEffect(
    useCallback(() => {
      let music: any = null;

      const loadMusic = async () => {
        Audio.Sound.createAsync(audio).then(({ sound }) => {
          music = sound
          music.playAsync()
          music.setIsLoopingAsync(true)
        })
      }

      loadMusic()

      return () => {
        if (music) music.unloadAsync()
      };
    }, []),
  );

  useEffect(() => setTableData(getTableData(npcs, place, cardQueen)), [npcs])

  if (Object.entries(npcs).length === 0) createNPCList();

  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  const [infoBoxText, setInfoBoxText] = useState(texts.newGameAlert)
  const [infoBoxTitle, setInfoBoxTitle] = useState(texts.wait)
  const [infoBoxCancel, setInfoBoxCancel] = useState<null | (() => void)>(null)
  const [infoBoxOk, setInfoBoxOk] = useState<() => void>()

  const setInfoBoxData = (props: {
    title: string,
    text: string,
    onOk: () => void,
    onCancel: null | (() => void)
  }) => {
    const { title, text, onOk, onCancel } = props;

    setInfoBoxTitle(title)
    setInfoBoxText(text)
    setInfoBoxOk(() => () => onOk())
    setInfoBoxCancel(onCancel)
    setInfoBoxVisible(true)
  }

  useEffect(() => {
    if (cardId === 0) return

    if (gameOverState === 'win') {
      cardClubEvents(
        events,
        changeEvent,
        npc,
        npcs,
        texts,
        addNpcToLocation,
        changeAchievement,
        setInfoBoxData,
        setInfoBoxVisible
      );
    } else if (gameOverState === 'loose' && (cardId === 48 || cardId > 77)) {
      rareCardsQuest(
        npc,
        cardId,
        place,
        events,
        changeEvent,
        addCardToNPC,
        changeCardQueenPlace,
        texts,
        achievements,
        changeAchievement,
        setInfoBoxData,
        setInfoBoxVisible
      );
    }

    setCardId(0)
    setNpc('')
    setGameOverState(null)
  }, [cardId])

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
    changeLastLocation(place)
    navigation.pop();
    navigation.push('Explore Scenes', { place, image, audio });
  };

  const startGame = (npcDeck: number[], npc: any) => {
    resetTable();
    const params = { npcDeck, location: place, npc }

    if (rules[place].random) {
      addCardsToStore(getRandonPlayerCards(playerCards), npcDeck);
      navigation.pop();
      navigation.push('GamePlay', { screen: 'GamePlay', params: params });
    } else {
      navigation.pop();
      navigation.navigate('Choose Cards', params);
    }
  };

  //MELHORAR
  const getPupuEvent = () => {
    if (events.pupu1) {
      changeEvent('pupu1');
      changeAchievement('pupu1')
    } else if (events.pupu2) changeEvent('pupu2');
    else if (events.pupu3) changeEvent('pupu3');
    else {
      changeEvent('pupu4');
      changeAchievement('pupu4')
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
        <CardModal visible={cardVisible} cardId={48} cardOwner={cardOwner} />
        <Button title={texts.travel} onPress={() => setVisible(true)} />
        {/* <Button
          title="Edit Deck"
          onPress={() => navigation.navigate('Game Deck', { screen: 'Game Deck', params: { deck: 'none', type: 'player' } })}
        /> */}
        <Button title={texts.goBack} onPress={() => navigation.pop()} />
      </View>
      <View style={styles.subContainerRight}>
        <Text style={styles.text}>{texts.listOfPlayers}</Text>
        <ScrollView style={{ width: '90%', height: '50%' }}>
          <NPCsTable
            tableHead={tableHead}
            tableData={tableData as any}
            startGame={startGame}
            texts={texts}
          />
        </ScrollView>
      </View>
      <ToastMessage />
      <InfoModal
        texts={texts}
        visible={infoBoxVisible}
        title={infoBoxTitle}
        text={infoBoxText}
        heightSize={'medium'}
        onOk={infoBoxOk}
        onCancel={infoBoxCancel}
      />
      {(getRandomNumber(0, 10) <= 2 && events.pupu4) && <PupuEvent getPupuEvent={getPupuEvent} />}
    </View>
  );
};

export default ExploreScenes;
