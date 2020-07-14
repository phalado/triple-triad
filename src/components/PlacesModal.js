import React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import * as Sounds from '../constants/Sounds';
import styles from '../styles/ModalScreen';

const PlacesModal = props => {
  const { handleTravel, visible } = props;

  const places = [
    ['Balamb Garden', 'balambGarden', Images.balambGarden, Sounds.balambGardenPlay, Sounds.balambGardenStop],
    ['Balamb Town', 'balambTown', Images.balambTown, Sounds.balambTownPlay, Sounds.balambTownStop],
    ['Dollet', 'dollet', Images.dollet, Sounds.dolletPlay, Sounds.dolletStop],
    ['Deling City', 'delingCity', Images.delingCity, Sounds.delingCityPlay, Sounds.delingCityStop],
    ['Galbadia Garden', 'galbadiaGarden', Images.galbadiaGarden, Sounds.galbadiaGardenPlay, Sounds.galbadiaGardenStop],
    ['Timber', 'timber', Images.timberManiacs, Sounds.timberManiacsPlay, Sounds.timberManiacsStop],
    ['Fisherman\'s Horizon', 'fishermansHorizon', Images.fishermansHorizon, Sounds.fishermansHorizonPlay, Sounds.fishermansHorizonStop],
    ['Shumi Village', 'shumiVillage', Images.shumiVillage, Sounds.balambTownPlay, Sounds.balambTownStop],
    ['Trabia Garden', 'trabiaGarden', Images.trabiaGarden, Sounds.trabiaGardenPlay, Sounds.trabiaGardenStop],
    ['Winhill', 'winhill', Images.winhill, Sounds.winhillPlay, Sounds.winhillStop],
    ['Edea\'s House', 'edeasHouse', Images.edeasHouse, Sounds.edeasHousePlay, Sounds.edeasHouseStop],
    ['Esthar', 'esthar', Images.esthar, Sounds.estharPlay, Sounds.estharStop],
  ];

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
