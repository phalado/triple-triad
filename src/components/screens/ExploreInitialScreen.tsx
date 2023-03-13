import React, { useState } from 'react';
import { View, Text, Button, LogBox } from 'react-native';
import places from '../../constants/Places';
// import ExploreModal from '../containers/ExploreInitialScreen';
import styles from '../../styles/ExploreInitial';
import Texts from '../../constants/Texts';
import InfoModal from '../modals/InfoModal';
import GameOptionsInterface from '../../interfaces/GameOptionsInterface';
import CardModal from '../modals/CardModal';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ExploreInitialScreen = (props: {
  navigation: any
  route: any
  gameOptions: GameOptionsInterface
  events: { [event: string]: boolean }
  addCardToExploreDeck: (card: number) => void
  createNPCList: () => void
  restartRules: () => void
}) => {
  const { navigation, route, addCardToExploreDeck, createNPCList, restartRules } = props
  const { eventNewGame, gameOptions, handleResetDeck } = route.params
  const { language, lastLocation } = gameOptions
  const [texts] = useState(Texts[(language as 'eng' | 'ptbr')])
  const [cardModalVisible, setCardModalVisible] = useState(false)
  const [modalCard, setModalCard] = useState(1);
  const [cardOwner, setCardOwner] = useState('player0');

  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  const [infoBoxText, setInfoBoxText] = useState(texts.newGameAlert)
  const [infoBoxTitle, setInfoBoxTitle] = useState(texts.wait)
  const [infoBoxCancel, setInfoBoxCancel] = useState<null | (() => void)>(() => () => setInfoBoxVisible(false))
  const [infoBoxOk, setInfoBoxOk] = useState(() => () => {
    handleResetDeck();
    setInfoBoxText(texts.newGameText)
    setInfoBoxCancel(null)
    setInfoBoxOk(() => () => addFirstCardsToDeck([1, 2, 4, 6, 7, 8, 10, 85]))
  })

  const startScene = () => {
    navigation.pop();
    navigation.push('Explore Scenes', {
      place: places[0][1],
      image: places[0][2],
      audio: places[0][3],
    });
  };

  const addFirstCardsToDeck = (cards: number[]) => {
    createNPCList();
    restartRules();
    addCardToExploreDeck(cards[0]);
    setCardOwner('player0');
    setCardModalVisible(true);
    setModalCard(cards[0]);
    setTimeout(() => {
      setCardOwner('player1');
      setTimeout(() => {
        setCardModalVisible(false);
        cards.shift();
        if (cards.length > 0) setTimeout(() => addFirstCardsToDeck(cards), 100);
        else startScene();
      }, 1000);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Coming Soon!</Text>
      <CardModal visible={cardModalVisible} cardId={modalCard} cardOwner={cardOwner} />
      <InfoModal
        texts={texts}
        visible={infoBoxVisible}
        title={infoBoxTitle}
        text={infoBoxText}
        onOk={infoBoxOk}
        onCancel={infoBoxCancel}
      />
      <Button title={texts.newGame} onPress={() => setInfoBoxVisible(true)} />
      {!eventNewGame && <Button
        title={texts.continue}
        onPress={() => {
          const place = places.find(plc => plc[1] === lastLocation) as any[]
          navigation.pop();
          navigation.push('Explore Scenes', {
            place: place[1],
            image: place[2],
            audio: place[3],
          });
        }}
      />}
      <Button title={texts.goBack} onPress={() => navigation.pop()} />
    </View>
  );
}

export default ExploreInitialScreen;
