import React from 'react';
import {
  View, Text, Button,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import styles from '../styles/ModalScreen';


const ExploreModal = props => {
  const {
    visible, playerCards, addCardToExploreDeck, resetPlayerDeckExplore,
  } = props;
  // if (Object.entries(playerCards).length === 0) resetPlayerDeckExplore();
  console.log(playerCards);

  return (
    <Modal isVisible={visible}>
      <View style={styles.newContainer}>
        <Text style={styles.speakingText}>
          Oh, hey, would you like to have these?
          My brother gave me these cards but they&apos;re really not my thing.
          You can have them if you&apos;d like.
        </Text>
        <Button
          title="Whatever."
          onPress={() => addCardToExploreDeck(1)}
        />
      </View>
    </Modal>
  );
};

ExploreModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  playerCards: PropTypes.objectOf(PropTypes.object).isRequired,
  addCardToExploreDeck: PropTypes.func.isRequired,
  resetPlayerDeckExplore: PropTypes.func.isRequired,
};

export default ExploreModal;
