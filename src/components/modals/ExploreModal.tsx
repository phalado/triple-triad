import React, { useState } from 'react'
import { Button, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import CardModal from './CardModal';
import styles from '../../styles/ModalScreen';
import Texts from '../../constants/Texts';
import GameOptionsInterface from '../../interfaces/GameOptionsInterface';

const ExploreModal = (
  props: {
    visible: boolean,
    startScene: () => void
    gameOptions: GameOptionsInterface
    addCardToExploreDeck: (card: number) => void
    createNPCList: () => void
    restartRules: () => void
  }
) => {
  const {
    visible,
    startScene,
    gameOptions,
    addCardToExploreDeck,
    createNPCList,
    restartRules
  } = props;
  const [texts] = useState(Texts[(gameOptions.language as 'eng' | 'ptbr')])
  const [cardModalVisible, setCardModalVisible] = useState(false)
  const [modalCard, setModalCard] = useState(1);
  const [cardOwner, setCardOwner] = useState('player0');


  // const addFirstCardsToDeck = (cards: number[]) => {
  //   createNPCList();
  //   restartRules();

  //   const addCards = async () => {
  //     cards.forEach(card => {
  //       addCardToExploreDeck(card);
  //       setCardOwner('player0');
  //       setCardModalVisible(true);
  //       setModalCard(card);

  //       setTimeout(() => {
  //         setCardOwner('player1');
  //         setTimeout(() => setCardModalVisible(false), 1000);
  //       }, 1000)
  //     })
  //   }

  //   addCards().then(() => startScene())
  // }

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
    <Modal isVisible={visible}>
      <CardModal visible={cardModalVisible} cardId={modalCard} cardOwner={cardOwner} />
      <View style={styles.newContainer}>
        <Text style={styles.speakingText}>{texts.newGame}</Text>
        <Button
          title={texts.whatever}
          onPress={() => addFirstCardsToDeck([1, 2, 4, 6, 7, 8, 10, 85])}
        />
      </View>
    </Modal>
  )
}

export default ExploreModal
