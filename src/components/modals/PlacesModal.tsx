import React from 'react';
import { Button, View } from 'react-native';
import Modal from 'react-native-modal';
import places from '../../constants/Places';
import styles from '../../styles/ModalScreen';

const PlacesModal = (props: {
  handleTravel: (place: string, image: string, audio: any) => void, visible: boolean
}) => {
  const { handleTravel, visible } = props;

  return (
    <Modal isVisible={visible}>
      <View style={styles.placeContainer}>
        {places.map((place: any) => (
          <Button
            title={place[0]}
            onPress={() => handleTravel(place[1], place[2], place[3])}
            key={place as any}
          />
        ))}
      </View>
    </Modal>
  );
}

export default PlacesModal
