import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import CardModal from './CardModal';
import styles from '../styles/ModalScreen';

const ExploreModal = props => {
  const {
    visible, table, addCardToExploreDeck, startScene, createNPCList,
  } = props;
  const [newVisible, setNewVisible] = useState(false);
  const [modalCard, setModalCard] = useState(1);
  const [cardOwner, setCardOwner] = useState('player0');

  const addFirstCardsToDeck = cards => {
    createNPCList();
    addCardToExploreDeck(cards[0]);
    setCardOwner('player0');
    setNewVisible(true);
    setModalCard(cards[0]);
    setTimeout(() => {
      setCardOwner('player1');
      setTimeout(() => {
        setNewVisible(false);
        cards.shift();
        if (cards.length > 0) {
          setTimeout(() => addFirstCardsToDeck(cards), 100);
        } else startScene();
      }, 1000);
    }, 1000);
  };

  return (
    <Modal isVisible={visible}>
      <CardModal visible={newVisible} card={modalCard} table={table} cardOwner={cardOwner} />
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
  );
};

ExploreModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  addCardToExploreDeck: PropTypes.func.isRequired,
  startScene: PropTypes.func.isRequired,
  createNPCList: PropTypes.func.isRequired,
};

export default ExploreModal;
