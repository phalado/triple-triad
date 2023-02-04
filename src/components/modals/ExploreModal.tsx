import React, { useState } from 'react'
import { Button, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import styles from '../../styles/ModalScreen';
import CardModal from './CardModal';

const ExploreModal = (
  props: {
    visible: boolean,
    startScene: any
    table: any
    addCardToExploreDeck: (card: number) => void
    createNPCList: () => void
    restartRules: () => void
  }
) => {
  const {
    visible,
    startScene,
    table,
    addCardToExploreDeck,
    createNPCList,
    restartRules
  } = props;
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
      <CardModal visible={cardModalVisible} cardId={modalCard} table={table} cardOwner={cardOwner} />
      <View style={styles.newContainer}>
        <Text style={styles.speakingText}>
          Oh, hey, would you like to have these?
          My brother gave me these cards but they&apos;re really not my thing.
          You can have them if you&apos;d like.
        </Text>
        <Button
          title="Whatever."
          onPress={() => addFirstCardsToDeck([1, 2, 4, 6, 7, 8, 10, 85])}
        />
      </View>
    </Modal>
  )
}

export default ExploreModal
