import React from 'react';
import { Button, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../../styles/ModalScreen';

const ChooseDeckModal = (props: {
  visible: boolean
  setVisible: (visible: boolean) => void
  selectedDeck: string
  setSelectedDeck: (deck: string) => void
}) => {
  const { visible, setVisible, selectedDeck, setSelectedDeck } = props;
  const decks = ['deck1', 'deck2', 'deck3', 'deck4', 'deck5']

  return (
    <Modal isVisible={visible} style={styles.decksModal}>
      <View style={styles.decksContainer}>
        {decks.map((deck: string) => (
          <Button
            title={deck}
            onPress={() => {
              setSelectedDeck(deck)
              setVisible(false)
            }}
            key={deck}
            disabled={deck === selectedDeck}
          />
        ))}
      </View>
    </Modal>
  );
}

export default ChooseDeckModal
