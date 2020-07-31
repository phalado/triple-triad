import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/PupuEvents';

const PupuEvent = props => {
  const { events, changeEvent, addCardToExploreDeck } = props;

  const checkForPupuEvents = () => {
    if (events.pupu1) changeEvent('pupu1');
    else if (events.pupu2) changeEvent('pupu2');
    else if (events.pupu3) changeEvent('pupu3');
    else {
      changeEvent('pupu4');
      addCardToExploreDeck(48);
    }
  };

  return (
    <TouchableOpacity onPress={() => checkForPupuEvents()} style={styles.container}>
      <Image
        style={styles.image}
        source={Images.ufo}
        alt="UFO"
      />
    </TouchableOpacity>
  );
};

PupuEvent.propTypes = {
  events: PropTypes.objectOf(PropTypes.any).isRequired,
  changeEvent: PropTypes.func.isRequired,
  addCardToExploreDeck: PropTypes.func.isRequired,
};

export default PupuEvent;
