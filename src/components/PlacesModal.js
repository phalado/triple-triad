import React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import * as Sounds from '../constants/Sounds';
import styles from '../styles/ModalScreen';
import Images from '../constants/Images';

const PlacesModal = props => {
  const { handleTravel, visible } = props;

  const places = [
    ['Balamb Garden', Images.balambGarden, Sounds.balambGardenPlay, Sounds.balambGardenStop],
    ['Balamb Town', Images.balambTown, Sounds.balambTownPlay, Sounds.balambTownStop],
    ['Fisherman\'s Horizon', Images.fishermansHorizon, Sounds.fishermansHorizonPlay, Sounds.fishermansHorizonStop],
  ];

  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        {places.map(place => (
          <Button
            title={place[0]}
            onPress={() => handleTravel(place[1], place[2], place[3])}
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
