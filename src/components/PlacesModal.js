import React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import places from '../constants/Places';
import styles from '../styles/ModalScreen';

const PlacesModal = props => {
  const { handleTravel, visible } = props;

  return (
    <Modal isVisible={visible}>
      <View style={styles.placeContainer}>
        {places.map(place => (
          <Button
            title={place[0]}
            onPress={() => handleTravel(place[1], place[2], place[3], place[4])}
            key={place}
          />
        ))}
      </View>
    </Modal>
  );
};

PlacesModal.propTypes = {
  handleTravel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PlacesModal;
